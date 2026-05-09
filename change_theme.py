import os, glob, re

directories = [r'f:\Paradise Fitness', r'd:\Gym']

replacements = {
    '#38bdf8': '#fbbf24',            # Neon Blue -> Gold
    '#38BDF8': '#fbbf24',
    'rgba(56, 189, 248': 'rgba(251, 191, 36',
    
    '#020617': '#121212',            # Deep Slate -> Matte Black
    'rgba(2, 6, 23': 'rgba(18, 18, 18',
    
    '#0f172a': '#1c1917',            # Lighter Slate -> Charcoal
    'rgba(15, 23, 42': 'rgba(28, 25, 23',
    
    '#1e293b': '#292524',            # Border Slate -> Darker Charcoal
    'rgba(30, 41, 59': 'rgba(41, 37, 36',
    
    # Replace images in CSS
    'Images/back1.jpg': 'Images/gold_hero.png',
    'Images/back2.jpg': 'Images/gold_secondary.png',
    'Images/back3.jpg': 'Images/gold_tertiary.png',
    'Images/back4.jpg': 'Images/gold_secondary.png',
    'Images/back5.jpg': 'Images/gold_hero.png',
    'Images/back6.jpg': 'Images/gold_tertiary.png',
    'Images/back7.jpg': 'Images/gold_secondary.png',
    'Images/planb.jpg': 'Images/gold_tertiary.png',
    'Images/contactb.jpg': 'Images/gold_hero.png',
}

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    # Replace the custom cursor css block if it's advanced.css
    if filepath.endswith('advanced.css'):
        # we will use regex to replace the .custom-cursor block to make it a diamond
        cursor_css = '''
.custom-cursor {
    width: 24px;
    height: 24px;
    background: transparent;
    border: 2px solid #fbbf24;
    position: fixed;
    border-radius: 4px;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%) rotate(45deg);
    transition: width 0.2s, height 0.2s, background-color 0.2s;
    box-shadow: 0 0 15px rgba(251, 191, 36, 0.5);
}
.custom-cursor.hovering {
    width: 40px;
    height: 40px;
    background: rgba(251, 191, 36, 0.2);
    border-color: transparent;
    transform: translate(-50%, -50%) rotate(90deg);
}
'''
        content = re.sub(r'\.custom-cursor\s*\{[^}]*\}\s*\.custom-cursor\.hovering\s*\{[^}]*\}', cursor_css.strip(), content, flags=re.MULTILINE)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for d in directories:
    for ext in ['*.html', '*.css', '*.js']:
        for filepath in glob.glob(os.path.join(d, ext)):
            update_file(filepath)

print('Color theme and images updated.')
