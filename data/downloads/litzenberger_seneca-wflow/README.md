# Seneca With Flow (seneca-wflow)
###
A simple waterflow wrapper for seneca microservices
 
# Idea

Chain microservices based on business workflow.  

# To Use

var _seneca = require('seneca')()

	.use('seneca-wflow', {
	
  	filename:'./workflow/yourflow',// module that contains the business flow
  	
  	sequence:['process1', 'process2',...]
  	
  	});

# Examples:


### Example 1 : 

	run with flow without seneca

	$ node example/example1 --seneca.log.all | grep flowEngine

### Example 2: 

	Example of creating a new workflow using the create command.


	$ node example/example2 


	Add loging to your plugin


	$ node example/example2 --seneca.log.all | grep example2


### Example 3:  
	Using the append command will append a sequence with number of times to execute the sequence.  Used to make loops.


	$ node example/example3

### Example 4:  
	Use pre-workflow flag to modify workflow prior to execute.

	var options={

	filename:"example4_seneca", // module 
	sequence:["hello","preWF:generateLoop"]
	}

	$ node example/example4

