var vows = require('vows'),
    should = require('should');

var Ship = require('radial/Ship');

// Create a Test Suite
vows.describe('Ship').addBatch({
    'when dividing a number by zero': {
        topic: function () { return 2 },

        'we get Infinity': function (topic) {
            topic.should.be.exactly(2);
        }
    }
}).exportTo(module); // Run it
