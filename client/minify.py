from os.path import dirname, realpath
from minifier.minifier import minifyCss, minifyHtml


minifyHtml(dirname(realpath(__file__)), realpath('../resources/'))
minifyCss(dirname(realpath(__file__)), realpath('../resources/css/styles.css'))