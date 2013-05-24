#!/bin/bash

# Generates archive of source code and data.
#
# Author: Jonathan Karr
# Affiliation: Covert Lab, Department of Bioengineering, Stanford University

#export repository
svn export http://covertlab.stanford.edu/svn/WholeCellViz WholeCellViz

#delete some files from archive
rm -rf WholeCellViz/DevelopersGuide.tex
rm -rf WholeCellViz/doc/
rm -rf WholeCellViz/data/sim/*
rm -rf WholeCellViz/data/sim/*.*
rm -rf WholeCellViz/E.coli/
rm -rf WholeCellViz/archive.sh
rm -rf WholeCellViz/kiosk.txt
rm -rf WholeCellViz/todo.txt
rm -rf WholeCellViz/.htaccess

#cleanup previous archive
rm -rf WholeCellViz.zip

#zip
zip WholeCellViz.zip -r WholeCellViz

#remove temporary files
rm -rf WholeCellViz
