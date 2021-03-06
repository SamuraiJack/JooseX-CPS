StartTest(function(t) {
    
	t.plan(10)
    
    //======================================================================================================================================================================================================================================================
    t.diag('Sanity')
    
    t.ok(JooseX.CPS.Continuation, "JooseX.CPS.Continuation is here")
    
    
    //======================================================================================================================================================================================================================================================            
    //t.diag('More Try/Then nesting')
    
    var async6  = t.beginAsync()
    var async7  = t.beginAsync()
    var cont6   = new JooseX.CPS.Continuation()
    var scope6  = {}
    var scope7  = {}
    
    cont6.TRY(function () {
        
        var CONT = this.CONT
        
        t.ok(CONT.parent == cont6, "Current continuation is nested into 'cont6'")
        
        setTimeout(function () {
            
            TRY(function () {
                //======================================================================================================================================================================================================================================================
                t.diag('More Try/Then nesting - Nested TRY')
                
                t.pass("Nested 'TRY' was reached anyway, regardless of early CONTINUE")
                
                t.ok(this == scope7, "Scope was correctly defaulted to top")
                
                this.CONT.CONTINUE('returnTo2')
                
            }, scope7).THEN(function (result) {
                //======================================================================================================================================================================================================================================================            
                t.diag('More Try/Then nesting - TRY')

                t.ok(result == 'returnTo2', 'NEXT was reached from the nested TRY with the correct result')

                
                this.CONT.TRY(function () {
                    
                    t.ok(this == scope7, "Scope was correctly passed into most nested 'TRY'")
                    
                    this.CONT.CONTINUE('result3')
                    
                }).THEN(function (result) {
                    
                    t.ok(this == scope7, "Scope was correctly passed into most nested 'NEXT'")
                    
                    t.ok(result == 'result3', 'Another NEXT was reached from the nested TRY with the correct result')
                    
                    this.CONT.CONTINUE('result4')
                    
                    t.endAsync(async6)
                    
                }).NOW()
                
            }).NOW()
            
            CONT.CONTINUE('early')
            
        }, 10)
        
    }, scope6).NEXT(function (result) {
        //======================================================================================================================================================================================================================================================            
        t.diag('More Try/Then nesting - NEXT')
        
        t.ok(this == scope6, "Scope was correctly passed into outer 'NEXT'")
        
        t.ok(result == 'early', 'Early returned was processed correctly')
        
        t.endAsync(async7)
    }).NOW()
        
})    