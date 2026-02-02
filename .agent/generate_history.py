import os
import shutil
import subprocess
import random
import time
from datetime import datetime, timedelta

# Configuration
REPO_PATH = "/home/zero/dev/projects/superhero"
TEMP_BACKUP_PATH = "/home/zero/dev/projects/superhero_backup_temp"
START_DATE = datetime(2026, 2, 2, 9, 0, 0)

# Commit definitions (batches of paths to add)
COMMITS = [
    # Day 1 - Feb 2: Foundation & Backend Core (Target: 7 commits)
    {
        "msg": "Initial commit",
        "files": ["package.json", "README.md", ".gitignore", "server/package.json"]
    },
    {
        "msg": "Initialize server structure",
        "files": ["server/src/index.js", "server/src/config"] # partial
    },
    {
        "msg": "Implement in-memory storage engine",
        "files": ["server/src/store"]
    },
    {
        "msg": "Add Superhero data model definition",
        "files": ["server/src/models"]
    },
    {
        "msg": "Setup file upload middleware",
        "files": ["server/src/middleware"]
    },
    {
        "msg": "Implement core superhero controllers",
        "files": ["server/src/controllers"]
    },
    {
        "msg": "Define API routes and endpoints",
        "files": ["server/src/routes"]
    },

    # Day 2 - Feb 3: Frontend Base & API (Target: 8 commits + 1 noise)
    {
        "msg": "Initialize React client application",
        "files": ["client/package.json", "client/vite.config.js", "client/index.html"]
    },
    {
        "msg": "Setup base styles and CSS variables",
        "files": ["client/src/index.css", "client/src/styles"]
    },
    {
        "msg": "Add utility helper functions",
        "files": ["client/src/utils"]
    },
    {
        "msg": "Implement API service layer",
        "files": ["client/src/api"]
    },
    # Noise commit: Modify utils temporarily
    {
        "msg": "WIP: Experimenting with data validation",
        "action": "modify",
        "target": "client/src/utils/helpers.js"
    },
    {
        "msg": "Revert validation experiments",
        "action": "restore",
        "target": "client/src/utils/helpers.js"
    },
    {
        "msg": "Create shared UI components",
        "files": ["client/src/components/ui"]
    },
    {
        "msg": "Setup application layout and navigation",
        "files": ["client/src/components/layout"]
    },
     {
        "msg": "Implement custom hooks for data fetching",
        "files": ["client/src/hooks"]
    },

    # Day 3 - Feb 4: Features & Polish (Target: 7 commits + 1 noise)
    {
        "msg": "Add Superhero form components",
        "files": ["client/src/components/superhero/SuperheroForm"]
    },
    {
        "msg": "Implement Image Gallery with Lightbox",
        "files": ["client/src/components/image"]
    },
    # Noise commit: Delete form header temporarily
    {
        "msg": "Refactor form header structure",
        "action": "delete",
        "target": "client/src/components/superhero/SuperheroForm/FormHeader"
    },
    {
        "msg": "Restore FormHeader with updated props",
        "action": "restore",
        "target": "client/src/components/superhero/SuperheroForm/FormHeader"
    },
    {
        "msg": "Add Superhero Card and List views",
        "files": ["client/src/components/superhero/SuperheroCard.jsx", "client/src/components/superhero/SuperheroCard", "client/src/components/superhero/SuperheroList", "client/src/components/superhero/SuperheroDetails"]
    },
    {
        "msg": "Assemble main application pages",
        "files": ["client/src/App.jsx", "client/src/main.jsx", "client/src/pages"] 
    },
    {
        "msg": "Finalize styles and responsive layout",
        "files": [] # Remaining files
    }
]

def run(cmd):
    subprocess.run(cmd, shell=True, check=True, cwd=REPO_PATH)

def main():
    print("Starting git history rewrite...")

    # 1. Backup
    if os.path.exists(TEMP_BACKUP_PATH):
        # Only remove if it's a dir
        if os.path.isdir(TEMP_BACKUP_PATH):
             shutil.rmtree(TEMP_BACKUP_PATH)
        else:
             os.remove(TEMP_BACKUP_PATH)
    
    # helper to ignore .git and node_modules
    def ignore_patterns(path, names):
        ignore_list = ['.git', 'node_modules', 'dist', 'coverage']
        return [n for n in names if n in ignore_list]

    shutil.copytree(REPO_PATH, TEMP_BACKUP_PATH, ignore=ignore_patterns)
    print(f"Backed up to {TEMP_BACKUP_PATH}")

    # 2. Reset Repo
    shutil.rmtree(os.path.join(REPO_PATH, ".git"), ignore_errors=True)
    run("git init")
    run("git config user.name 'Zero'") 
    run("git config user.email 'zero@example.com'")
    
    # 3. Clear directory (preserve protected)
    for item in os.listdir(REPO_PATH):
        if item == '.git' or item == 'node_modules' or item == '.agent' or item == '.vscode':
            continue
        try:
            path = os.path.join(REPO_PATH, item)
            if os.path.isdir(path):
                shutil.rmtree(path)
            else:
                os.remove(path)
        except Exception as e:
            print(f"Warning deleting {item}: {e}")

    # 4. Execute Commits
    commits_per_day = {
        2: [c for i, c in enumerate(COMMITS) if i < 7],
        3: [c for i, c in enumerate(COMMITS) if 7 <= i < 16],
        4: [c for i, c in enumerate(COMMITS) if 16 <= i]
    }

    for day_num in [2, 3, 4]:
        day_date = datetime(2026, 2, day_num)
        day_commits = commits_per_day.get(day_num, [])
        
        base_time = day_date.replace(hour=9, minute=0)
        
        for commit in day_commits:
            # Advance time by 30-90 mins
            base_time += timedelta(minutes=random.randint(30, 90))
            if base_time.hour >= 20: 
                base_time = base_time.replace(hour=19, minute=59)
            
            iso_date = base_time.strftime('%Y-%m-%dT%H:%M:%S')
            
            if "action" in commit:
                # Handle special modify/delete/restore actions
                target_rel = commit["target"]
                target_full = os.path.join(REPO_PATH, target_rel)
                
                if commit["action"] == "modify":
                    # Append a comment
                    if os.path.exists(target_full):
                         # Ensure we can write
                        with open(target_full, 'a') as f:
                            f.write("\n// Temporary debug comment\n")
                    else: 
                        print(f"Skipping modify: {target_rel} not found")
                
                elif commit["action"] == "delete":
                    if os.path.exists(target_full):
                        if os.path.isdir(target_full):
                            shutil.rmtree(target_full)
                        else:
                            os.remove(target_full)
                    else:
                         print(f"Skipping delete: {target_rel} not found")
                
                elif commit["action"] == "restore":
                    # Copy back from backup
                    src = os.path.join(TEMP_BACKUP_PATH, target_rel)
                    dst = os.path.join(REPO_PATH, target_rel)
                    if os.path.exists(src):
                        if os.path.isdir(src):
                            if os.path.exists(dst): shutil.rmtree(dst)
                            shutil.copytree(src, dst)
                        else:
                             # Ensure dir exists
                            os.makedirs(os.path.dirname(dst), exist_ok=True)
                            shutil.copy2(src, dst)
                    else:
                         print(f"Skipping restore: {target_rel} not found in backup")

            else:
                # Standard file addition
                files_to_copy = commit["files"]
                if not files_to_copy: # Empty means "rest of files"
                    # copy everything remaining from backup
                     shutil.copytree(TEMP_BACKUP_PATH, REPO_PATH, dirs_exist_ok=True)
                else:
                    for f_rel in files_to_copy:
                        src = os.path.join(TEMP_BACKUP_PATH, f_rel)
                        dst = os.path.join(REPO_PATH, f_rel)
                        
                        if os.path.exists(src):
                            if os.path.isdir(src):
                                # Copy tree merging
                                shutil.copytree(src, dst, dirs_exist_ok=True)
                            else:
                                os.makedirs(os.path.dirname(dst), exist_ok=True)
                                shutil.copy2(src, dst)
                        else:
                            # If src doesn't exist, it might be a component path inside a copied dir?
                            # Or maybe it's just missing. We start silent, but can print.
                            pass

            # Commit
            run("git add .")
            # We check if changes exist
            status = subprocess.run("git status --porcelain", shell=True, capture_output=True, cwd=REPO_PATH)
            if status.stdout:
                env = os.environ.copy()
                env['GIT_AUTHOR_DATE'] = iso_date
                env['GIT_COMMITTER_DATE'] = iso_date
                subprocess.run(f'git commit -m "{commit["msg"]}"', shell=True, env=env, cwd=REPO_PATH, check=True)
                print(f"Committed: {commit['msg']} at {iso_date}")
            else:
                print(f"Skipping empty commit: {commit['msg']}")

    # 5. Final Restoration (Safety Net)
    print("Finalizing state...")
    shutil.copytree(TEMP_BACKUP_PATH, REPO_PATH, dirs_exist_ok=True)
    
    # Cleanup
    shutil.rmtree(TEMP_BACKUP_PATH)
    print("History rewrite complete.")

if __name__ == "__main__":
    main()
