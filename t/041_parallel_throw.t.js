StartTest(function(t) {
    
    //======================================================================================================================================================================================================================================================
    t.diag('Sanity')
    
    t.ok(JooseX.CPS.Continuation, "JooseX.CPS.Continuation is here")
    
    
    //======================================================================================================================================================================================================================================================            
    t.diag('Simplest call')

    var async1 = t.beginAsync()
    
    var branch1Reached  = false
    var branch2Reached  = false
    var branch3Reached  = false
    var thenReached     = false
    
    TRY(function (p1, p2) {
        
        var CONT = this.CONT
        
        setTimeout(function () {
            t.pass('1st branch was reached')
            
            t.ok(!branch1Reached, "Branch 1 wasn't reached yet")
            t.ok(branch2Reached, "Branch 2 was reached")
            t.ok(branch3Reached, "Branch 3 was reached")
            t.ok(!thenReached, "THEN wasn't reached yet")
            
            branch1Reached = true
            
            t.ok(p1 == 1 && p2 == 10, 'Correct parameters were passed')
            
            CONT.THROW('error1')
        }, 1000)
        
    }).AND(function (p1, p2) {
        
        var CONT = this.CONT
        
        setTimeout(function () {
            t.pass('2nd branch was reached')
            
            t.ok(!branch1Reached, "Branch 1 wasn't reached yet")
            t.ok(!branch2Reached, "Branch 2 wasn't reached yet")
            t.ok(branch3Reached,  "Branch 3 was reached")
            t.ok(!thenReached, "THEN wasn't reached yet")
            
            branch2Reached = true
            
            t.ok(p1 == 1 && p2 == 10, 'Correct parameters were passed')
            
            CONT.THROW('error2')
        }, 500)
        
    }).AND(function (p1, p2) {
        
        var CONT = this.CONT
        
        setTimeout(function () {
            t.pass('3rd branch was reached')
            
            t.ok(!branch1Reached, "Branch 1 wasn't reached yet")
            t.ok(!branch2Reached, "Branch 2 wasn't reached yet")
            t.ok(!branch3Reached, "Branch 3 wasn't reached yet")
            t.ok(!thenReached, "THEN wasn't reached yet")
            
            branch3Reached = true
            
            t.ok(p1 == 1 && p2 == 10, 'Correct parameters were passed')
            
            CONT.CONTINUE('value3')
        }, 0)
        
    }).CATCH(function (error1, error2, error3) {
        
        t.pass("Reached 'CATCH' after parallel statement")
        
        t.ok(error1 == 'error1', 'Correct exception caught #1')
        t.ok(error2 == 'error2', 'Correct exception caught #2')
        t.ok(error3 == undefined, 'No exceptions for 3rd branch')
        
        this.CONT.CONTINUE()
        
    }).THEN(function () {
        
        t.pass('THEN was reached')
        thenReached = true
        
        t.ok(branch1Reached, "Branch 1 was reached")
        t.ok(branch2Reached, "Branch 2 was reached")
        t.ok(branch3Reached, "Branch 3 was reached")
        
        t.endAsync(async1)
        t.done()
        
    }).NOW(1, 10)
    
})    