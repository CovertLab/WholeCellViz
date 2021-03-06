# WholeCellViz

[WholeCellViz](http://wholecellviz.stanford.edu) is a web-based software program for visually analyzing whole-cell simulations. This git repository provides the WholeCellViz server and client source code.

WholeCellViz enables users to interactively analyze many aspects of cell physiology including:
* Cell mass, volume, and shape,
* Metabolite, RNA, and protein copy numbers,
* Metabolic reaction fluxes,
* Molecular machine statuses – DNA polymerase, RNA polymerase, ribosome, FtsZ ring, and the
* Chromosome copy number, superhelicity, integrity, and DNA binding status.
 
Currently, WholeCellViz provides access to cached simulations of the Gram-positive bacterium Mycoplasma genitalium2. See the Advanced usage section below for information about how to install WholeCellViz locally to use the software to run and analyze your own simulations and/or other high-throughput biological data, as well as how to add additional visualizations.

## Features
WholeCellViz has several features for visually analyzing whole-cell simulations:

14 structured visualizations encompassing a wide spectrum of cell physiology. These visualizations each provide tooltips and mouse clicks to enable users to obtain further information.
* A time series plot tool to further explore model predictions.
* A layout editor which enables users to configure a grid of structured visualizations and time series plots, enabling users to simultaneously compare multiple model predictions side-by-side.
* A layout history. Simply use your browser's backward/forward buttons to undo/redo layout changes.
* A single animation timeline with play, pause, seek, speed, and repeat controls.
* Data import in JSON format
* Graphical export in SVG format
* Data export in JSON format

WholeCellViz is freely available open-source and can be easily expanded for use with new whole-cell simulations and other high-throughput data. See the Advanced usage section below for information about how to install WholeCellViz locally to use the software to run and analyze your own simulations and/or other high-throughput biological data, as well as how to add additional visualizations.

## Getting started
See the online help at the [WholeCellViz website](http://wholecellviz.stanford.edu).

## Installing WholeCellViz locally
The easiest way to run the WholeCellViz software locally is to download the Whole-cell virtual machine posted at [SimTK](http://simtk.org/home/wholecell). Installation and usage instructions are also posted at SimTK. The virtual machine is a virtual Mint Linux machine for use with the free VirtualBox software. The virtual machine includes WholeCellViz as well as the simulation software and WholeCellKB. The virtual machine can be used to run new whole-cell simulations, analyze new simulations using WholeCellViz, and add new structured visualizations to WholeCelLViz.

To install WholeCellViz on your own machine: (1) download the WholeCellViz source code by cloning this repository, and (2) follow the installation instructions in the [Developer's Guide](DevelopersGuide.pdf).

## MIT license
Copyright (c) 2013 Stanford University

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

## Need help?
Contact the authors at [wholecell@lists.stanford.edu](mailto:wholecell@lists.stanford.edu).
