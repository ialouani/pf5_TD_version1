.PHONY=execution all__testS clear 
test_ALL: ./exo1_pf6.js
	node $<
clear:
	rm -f *.js~ Makefile~


