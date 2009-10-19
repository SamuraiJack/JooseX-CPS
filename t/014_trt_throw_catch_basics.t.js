StartTest(function(t) {
    
	t.plan(7)
    
    var async0 = t.beginAsync()
    
    use('JooseX.CPS.Continuation.TryRetThen', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(JooseX.CPS.Continuation.TryRetThen, "JooseX.CPS.Continuation.TryRetThen is here")
        

        //======================================================================================================================================================================================================================================================
        //t.diag('Call with THROW/CATCH - simple error')

        var async1  = t.beginAsync()
        var cont1   = new JooseX.CPS.Continuation.TryRetThen()
        var scope1  = {}

        
        cont1.TRY(function () {
            //======================================================================================================================================================================================================================================================            
            t.diag('Call with THROW/CATCH - simple error')
            
            this.THROW('error1')
            
            t.fail("Reached code after 'THROW'")
            
        }, scope1).CATCH(function (e) {
            
            t.ok(this == scope1, "'CATCH' scope was copied from 'TRY'")
            
            t.ok(e == 'error1', "Error thrown via 'THROW' was caught")
            
            t.endAsync(async1)
            
        }).NOW()


        //======================================================================================================================================================================================================================================================
        //t.diag('Call with THROW/CATCH - native exceptions')

        var async2  = t.beginAsync()
        var cont2   = new JooseX.CPS.Continuation.TryRetThen()
        var scope2  = {}

        
        cont2.TRY(function () {
            //======================================================================================================================================================================================================================================================            
            t.diag('Call with THROW/CATCH - native exceptions')
            
            throw 'error2'
            
            t.fail("Reached code after 'THROW'")
            
        }, {}).CATCH(function (e) {
            
            t.ok(this == scope2, "'CATCH' scope was taken from arguments")
            
            t.ok(e == 'error2', "Error thrown via native 'throw' was caught correctly")
            
            t.endAsync(async2)
            
        }, scope2).NOW()
        
        
        
        //======================================================================================================================================================================================================================================================
        //t.diag('THROW with THEN')

        var async3  = t.beginAsync()
        var cont3   = new JooseX.CPS.Continuation.TryRetThen()
        
        cont3.TRY(function () {
            //======================================================================================================================================================================================================================================================            
            t.diag('THROW with THEN')
            
            throw 'error3'
            
            t.fail("Reached code after 'THROW'")
            
        }, {}).CATCH(function (e) {
            
            t.ok(e == 'error3', "Error thrown via native 'throw' was caught correctly")
            
        }).THEN(function () {
            
            t.pass("'THEN' was reached")
            
            t.endAsync(async3)
        })

        
        t.endAsync(async0)
    })
    
})    