import os, glob

directories = [r'f:\Paradise Fitness', r'd:\Gym']

for d in directories:
    html_files = glob.glob(os.path.join(d, '*.html'))
    for file_path in html_files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace .png with .jpeg
        if 'Images/logo.png' in content:
            new_content = content.replace('Images/logo.png', 'Images/logo.jpeg')
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)

print("Updated logo extensions.")
