##########
# ftszring_draw.py
# Generates JSON file for visualization of FtsZRing with Javascript.
#
# Author: Ruby Lee, Covert Lab
##########

import numpy as np
import os
import random
import scipy
import scipy.io
import sys

baseDir = sys.argv[1]
simBatch = sys.argv[2]
simIdx = sys.argv[3]
simDir = baseDir + '/' + simBatch + '/' + simIdx

class_name = "FtsZRing"
attrs = ['numEdgesOneStraight','numEdgesTwoStraight','numEdgesTwoBent',
	'numResidualBent','numEdges']

#make output directory
try:
	os.mkdir(simDir + '/json/')
except:
	pass
try:
	os.mkdir(simDir + '/json/FtsZRing/')
except:
	pass

#check if data files exist
if not os.path.exists(simDir + '/state-' + class_name + '-' + attrs[0] + '.mat'):
	print 'Warning: data files do not exist!'
	json_out = open(simDir + '/json/FtsZRing/animation.json', 'w')
	json_out.write('{\n')
	json_out.write('\t"start_time": null,\n')
	json_out.write('\t"end_time": null,\n')
	json_out.write('\t"data": [],\n')
	json_out.write('\t"error": true\n')
	json_out.write('}')
	json_out.close()	
	sys.exit(0)
	

data = {}				# key: attribute name, value: list of values
for attr in attrs:
	temp = scipy.io.loadmat(simDir + '/state-' + class_name + '-' + attr + '.mat')
	data[attr] = temp['data'][0][0]

window_width = 520
window_height = 250
x_center = window_width/2
y_center = window_height/2
edge_length = 30														# edge length of polygon
t_start = 0
t_end = 0

for ind, num in enumerate(data['numEdgesOneStraight']):					# timepoint at initiation of chromosomal segregation
	if num != 0:
		t_start = max(1, ind - 1)
		break

for ind, num in enumerate(data['numEdges']):							# timepoint at pinching of FtsZ ring
	if num == 2:
		t_end = min(len(data['numEdges'])-2, ind + 3)
		break

num_edges = data['numEdges'][t_start]
num_edges_one_straight = 0
num_edges_two_straight = 0
num_edges_two_bent = 0
num_edges_one_bent = 0
r = 0
coords = []														# list of tuples
inds_edges_zero_straight = []									# indexes of edges with 0 straight filaments
inds_edges_one_straight = []									# indexes of edges with 1 straight filament
inds_edges_two_straight = []									# indexes of edges with 2 straight filaments
inds_edges_two_bent = []										# indexes of edges with 2 bent filaments
inds_edges_one_bent = []										# indexes of edges with 1 bent filament

json_out = open(simDir + '/json/FtsZRing/animation.json', 'w')
json_out.write('{\n')
json_out.write('\t"start_time": ' + str(t_start) + ',\n')
json_out.write('\t"end_time": ' + str(t_end) + ',\n')
json_out.write('\t"data": [')

for t in range(t_start, t_end):
	# 0 or 1 straight filaments to 2 straight filaments
	if data['numEdgesTwoStraight'][t] > num_edges_two_straight:
		diff = data['numEdgesTwoStraight'][t] - num_edges_two_straight
		for i in range(0,diff):
			if len(inds_edges_one_straight) != 0:
				inds_edges_two_straight.append(inds_edges_one_straight.pop())
			else:
				inds_edges_two_straight.append(inds_edges_zero_straight.pop())
	num_edges_two_straight = data['numEdgesTwoStraight'][t]
	
	# 0 straight filaments to 1 straight filament
	if data['numEdgesOneStraight'][t] > num_edges_one_straight:
		diff = data['numEdgesOneStraight'][t] - num_edges_one_straight
		for i in range(0,diff):
			if len(inds_edges_zero_straight) > 0:
				inds_edges_one_straight.append(inds_edges_zero_straight.pop())
	num_edges_one_straight = data['numEdgesOneStraight'][t]
	
	# safety check - when num_edges_two_straight reaches max, all edges should have 2 straight filaments
	if num_edges_two_straight >= data['numEdgesTwoStraight'][t-1] and num_edges_two_straight > data['numEdgesTwoStraight'][t+1]:
		while len(inds_edges_zero_straight) != 0:
			inds_edges_two_straight.append(inds_edges_zero_straight.pop())
		while len(inds_edges_one_straight) != 0:
			inds_edges_two_straight.append(inds_edges_one_straight.pop())
		num_edges_one_straight = len(inds_edges_one_straight)
		num_edges_two_straight = len(inds_edges_two_straight)
	
	# 2 straight filaments to 2 bent filaments
	if data['numEdgesTwoBent'][t] > num_edges_two_bent:
		diff = data['numEdgesTwoBent'][t] - num_edges_two_bent
		for i in range(0,diff):
			if len(inds_edges_two_straight) > 0:
				inds_edges_two_bent.append(inds_edges_two_straight.pop())
	num_edges_two_bent = data['numEdgesTwoBent'][t]
	
	# safety check - when num_edges_two_bent reaches max, all edges should have 2 bent filaments
	if num_edges_two_bent >= data['numEdgesTwoBent'][t-1] and num_edges_two_bent > data['numEdgesTwoBent'][t+1]:
		while len(inds_edges_two_straight) != 0:
			inds_edges_two_bent.append(inds_edges_two_straight.pop())
		num_edges_two_straight = len(inds_edges_two_straight)
		num_edges_two_bent = len(inds_edges_two_bent)
	
	# 2 bent filaments to 1 bent filament
	if data['numResidualBent'][t] > num_edges_one_bent:
		diff = data['numResidualBent'][t] - num_edges_one_bent
		for i in range(0,diff):
			if len(inds_edges_two_bent) > 0:
				ind = inds_edges_two_bent.pop()
				inds_edges_one_bent.append(ind)
				inds_edges_zero_straight.append(ind)			# 1 straight filament can attach to this edge
	
	# safety check - when num_edges_one_bent reaches max, all edges should have 1 bent filament
	if data['numResidualBent'][t] >= data['numResidualBent'][t-1] and data['numResidualBent'][t] > data['numResidualBent'][t+1]:
		while len(inds_edges_two_bent) != 0:
			inds_edges_one_bent.append(inds_edges_two_bent.pop())
	num_edges_two_bent = len(inds_edges_two_bent)
	num_edges_one_bent = len(inds_edges_one_bent)
	
	# 1 bent filament to 0 bent filaments
	if data['numResidualBent'][t] < num_edges_one_bent:
		diff = num_edges_one_bent - data['numResidualBent'][t]
		for i in range(0,diff):
			if len(inds_edges_one_bent) > 0:
				inds_edges_one_bent.pop()
	num_edges_one_bent = data['numResidualBent'][t]
	
	# start new smaller ring with new coords and edge indices
	# (at this point, each edge should only have 1 bent filament)
	if t == t_start or (num_edges_one_bent == data['numEdges'][t] + 1 and num_edges_one_bent != data['numResidualBent'][t-1]):
		num_edges = data['numEdges'][t]
		central_angle = 2*np.pi/num_edges
		r = edge_length*np.sin(0.5*(np.pi-central_angle))/np.sin(central_angle)
		
		coords = []
		for i in range(0,num_edges):						# calculate coordinates of vertices
			coords.append((x_center + r*np.cos(i*central_angle), y_center + r*np.sin(i*central_angle)))
		
		inds_edges_zero_straight = range(0,num_edges)		# generate new edge indices
		random.shuffle(inds_edges_zero_straight)
	
	# write to JSON file
	json_out.write('\t{\n')
	json_out.write('\t\t"time": [' + str(t) + "],\n")
	json_out.write('\t\t"r": ' + str(r) + ",\n")
	
	json_out.write('\t\t"coords_edges_one_straight": ')
	json_string = ""
	for ind in inds_edges_one_straight:
		if ind == num_edges-1:
			json_string += '[' + str(coords[ind][0]) + ',' + str(coords[ind][1]) + ',' + str(coords[0][0]) + ',' + str(coords[0][1]) + '],'
		else:
			json_string += '[' + str(coords[ind][0]) + ',' + str(coords[ind][1]) + ',' + str(coords[ind+1][0]) + ',' + str(coords[ind+1][1]) + '],'
	json_string = '[' + json_string[:-1] + '],\n'			# remove trailing comma
	json_out.write(json_string)
	
	json_out.write('\t\t"coords_edges_two_straight": ')
	json_string = ""
	for ind in inds_edges_two_straight:
		ind = ind % len(coords)	
		if ind == num_edges - 1:
			json_string += '[' + str(coords[ind][0]) + ',' + str(coords[ind][1]) + ',' + str(coords[0][0]) + ',' + str(coords[0][1]) + '],'
		else:
			json_string += '[' + str(coords[ind][0]) + ',' + str(coords[ind][1]) + ',' + str(coords[ind+1][0]) + ',' + str(coords[ind+1][1]) + '],'
	json_string = '[' + json_string[:-1] + '],\n'			# remove trailing comma
	json_out.write(json_string)
	
	json_out.write('\t\t"angles_edges_two_bent": ')
	json_string = ""
	for ind in inds_edges_two_bent:
		start_angle = 2*np.pi/num_edges * ind
 		stop_angle = start_angle + 2*np.pi/num_edges
		json_string += '[' + str(start_angle) + ',' + str(stop_angle) + '],'
	json_string = '[' + json_string[:-1] + '],\n'			# remove trailing comma
	json_out.write(json_string)
	
	json_out.write('\t\t"angles_edges_one_bent": ')
	json_string = ""
	for ind in inds_edges_one_bent:
		start_angle = 2*np.pi/num_edges * ind
 		stop_angle = start_angle + 2*np.pi/num_edges
		json_string += '[' + str(start_angle) + ',' + str(stop_angle) + '],'
	json_string = '[' + json_string[:-1] + ']\n'			# remove trailing comma
	json_out.write(json_string)
	
	if t == t_end-1:
		json_out.write('\t}\n')
	else:
		json_out.write('\t},\n')
	
	#print "JSON data for t = " + str(t) + "s added."

json_out.write(']}')
json_out.close()