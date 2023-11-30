import os

def list_folders_and_files(folder_path, file, indent=0):
    """
    List folders and subfolders along with files in a hierarchical format with indentation.
    The depth of indentation increases with subfolder depth.
    """
    for root, dirs, files in os.walk(folder_path):
        # Extract relative path from the root directory
        relative_path = os.path.relpath(root, folder_path)
            
        # Count the number of leading slashes to determine the depth
        depth = relative_path.count(os.path.sep)

        # Indentation based on the depth
        indentation = ' ' * (depth * 2)

        # Prefix for folders and subfolders
        prefix = '-' * (depth + 1)

        # Write the folder or subfolder name to the file
        file.write(f"{indentation}{prefix} {os.path.basename(root)}\n")

        # Write the files in the current folder
        for file_name in files:
            file.write(f"{indentation}   {file_name}\n")

if __name__ == "__main__":
    current_directory = os.path.dirname(os.path.realpath(__file__))
    with open('folder_and_file_list.txt', 'w') as file:
        list_folders_and_files(current_directory, file)
    print("Folder and file list has been saved to 'folder_and_file_list.txt'")
