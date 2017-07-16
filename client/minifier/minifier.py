from re import search, sub
from glob import glob
from os import makedirs
from os.path import exists, basename

def minifyHtml(dir, out):
    
    basePath = 'views'
    
    path = '%s/%s/%s' % (dir, basePath, '**/*.html')
    
    for filePath in glob(path, recursive=True):
        
        with open(filePath, 'r') as file:
            outPath = '%s/%s%s' % (out, basePath, filePath.split(basePath)[1])
            
            if not exists(outPath.replace(basename(outPath), "")):
                makedirs(outPath.replace(basename(outPath), ""))
                
            
            with open(outPath, 'w+') as outFile:
                for line in file:
                    outFile.write(sub('[\\n\\t]', "", line.strip()))
                
            
def minifyCss(dir, out):
    
    basePath = 'css'
    
    path = '%s/%s/%s' % (dir, basePath, '**/*.css')
    
    styles = "";
    
    for filePath in glob(path, recursive=True):
        
        with open(filePath, 'r') as file:
            
            for line in file:
                styles += sub('[\\n\\t]', "", line.strip())
                
            
    
    with open(out, 'w+') as outFile:
        outFile.write(styles)