import os

def overwrite_json_files():
    for filename in os.listdir('.'):
        if filename.endswith('.json') and os.path.isfile(filename):
            with open(filename, 'w', encoding='utf-8') as f:
                f.write('{}')
            print(f"Overwritten: {filename}")

if __name__ == "__main__":
    overwrite_json_files()