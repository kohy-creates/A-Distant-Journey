import zipfile
import json
from PIL import Image
from io import BytesIO
import os

root = os.path.dirname(os.path.abspath(__file__))
output_dir = os.path.join(root, "output")
os.makedirs(output_dir, exist_ok=True)


def collect_atlas_sources(zipf):
    """
    Collect all atlas-referenced textures from blocks.json / atlases.json.
    Returns a list of tuples for matching:
      - ('single', modid, path)
      - ('dir', directory, prefix)
    """
    sources = []

    for name in zipf.namelist():
        if name.endswith("atlases/blocks.json") or name.endswith("atlases.json"):
            try:
                data = json.loads(zipf.read(name))
                for src in data.get("sources", []):
                    typ = src.get("type", "")
                    if typ.endswith("directory"):
                        directory = src.get("source", "")
                        prefix = src.get("prefix", "")
                        sources.append(("dir", directory, prefix))
                    elif typ.endswith("single"):
                        resource = src.get("resource")
                        if ":" in resource:
                            modid, path = resource.split(":", 1)
                        else:
                            modid, path = "minecraft", resource
                        sources.append(("single", modid, path))
                    elif typ.endswith("paletted_permutations"):
                        for tex in src.get("textures", []):
                            if ":" in tex:
                                modid, path = tex.split(":", 1)
                            else:
                                modid, path = "minecraft", tex
                            sources.append(("single", modid, path))
            except Exception:
                continue
    return sources


def matches_atlas(name_lower, atlas_sources):
    """
    Check if zip entry matches any atlas texture
    """
    for src in atlas_sources:
        if src[0] == "dir":
            directory, prefix = src[1], src[2]
            check_path = f"/textures/{directory}/{prefix}".lower()
            if check_path in name_lower:
                return True
        elif src[0] == "single":
            modid, path = src[1], src[2]
            check_path = f"/textures/{path}.png".lower()
            if f"assets/{modid}" in name_lower and check_path in name_lower:
                return True
    return False


for file in os.listdir(root):
    if not file.endswith((".jar", ".zip")):
        continue

    archive_path = os.path.join(root, file)

    try:
        with zipfile.ZipFile(archive_path) as z:

            file_list = set(z.namelist())
            atlas_sources = collect_atlas_sources(z)

            for name in file_list:
                name_lower = name.lower()

                if not name_lower.endswith(".png"):
                    continue

                # Include block/item textures or atlas textures
                if ("/textures/block/" not in name_lower and
                    "/textures/item/" not in name_lower and
                    not matches_atlas(name_lower, atlas_sources)):
                    continue

                # Skip animated textures
                if name + ".mcmeta" in file_list:
                    continue

                try:
                    data = z.read(name)
                    img = Image.open(BytesIO(data))
                    w, h = img.size
                except:
                    continue  # skip unreadable

                # Skip textures where both dimensions are multiples of 16
                if w % 16 == 0 and h % 16 == 0:
                    continue

                # Everything else is flagged (matches Minecraft mipmap warnings)
                print(f"{name} ({w}x{h})")
                out_path = os.path.join(output_dir, name)
                os.makedirs(os.path.dirname(out_path), exist_ok=True)
                with open(out_path, "wb") as f:
                    f.write(data)

    except:
        continue