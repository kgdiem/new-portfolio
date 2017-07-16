from re import search, sub
from glob import glob
from os import makedirs
from os.path import dirname, realpath, exists, basename

out = dirname('../../resources/views')

dir = dirname(realpath(__file__))

basePath = search(r'[a-zA-Z]*$', dir).group(0)

path = '%s/%s' % (dir, '**/*.html')

for filePath in glob(path, recursive=True):
    print(filePath)
    with open(filePath, 'r') as file:
        outPath = '%s/%s%s' % (out, basePath, filePath.split(basePath)[1])
        
        if not exists(outPath.replace(basename(outPath), "")):
            makedirs(outPath.replace(basename(outPath), ""))
            
        
        with open(outPath, 'w+') as outFile:
            for line in file:
                outFile.write(sub('[\\n\\t]', "", line.strip()))
            
        
