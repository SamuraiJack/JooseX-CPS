StartTest(function(t) {
    
	t.plan(14)
    
    var async0 = t.beginAsync()
	
    use('JooseX.CPS', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(JooseX.CPS, "JooseX.CPS is here")
        t.ok(JooseX.CPS.Builder, "JooseX.CPS.Builder is here")
        t.ok(JooseX.CPS.Continuation.TryRetThen, "JooseX.CPS.Continuation.TryRetThen is here")

        //======================================================================================================================================================================================================================================================
        t.diag('Class creation')
        
        Class('CPS.Enabled', {
            
            trait : JooseX.CPS,
            
            methods : {
                
                //hypotetical call with callback
                xhr : function (params) {
            
                    setTimeout(function () {
                        if (params.error)
                            params.errback.call(params.scope || Joose.top, params.value1 || 'value1', params.value2 || 'value2', params)
                        else
                            params.callback.call(params.scope || Joose.top, params.value1 || 'value1', params.value2 || 'value2', params)
                    }, 1)
                }
            },
            
            
            continued : {
                
                methods : {
                    
                    checkEven : function (param1, param2) {
                        
                        var CONT = this.CONT
                        
                        setTimeout(function () {
                            if ((param1 + param2) % 2 == 0) 
                                CONT.RETURN('even')
                            else
                                CONT.THROW('odd')
                        }, 1)
                    },
                    
                    
                    request : function (value1, value2, error) {
                        this.xhr({
                            error : error,
                            
                            value1 : value1, 
                            value2 : value2,
                            
                            callback : this.RETURN,
                            errback  : this.THROW
                        })
                    },
                    
                    
                    async3 : function () {
                    }
                }
                
//                ,
//                after : {
//                    async1 : function (param1, param2) {
//                        this.RETURN()
//                    }
//                }
            }
        
        })
        
        t.ok(CPS.Enabled, 'CPS.Enabled class was created')

        
        //======================================================================================================================================================================================================================================================
        t.diag('Class instantiation')
        
        var cps = new CPS.Enabled()
        
        t.ok(cps, "'CPS.Enabled' class was instantiated")
        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Basic method call - with error')
        
        var async1 = t.beginAsync()
        
        var res1 = cps.checkEven(1, 10)
        
        t.ok(res1 instanceof JooseX.CPS.Continuation.TryRetThen, "Continued methods returned an instance of 'JooseX.CPS.Continuation.TryRetThen'")
        
        res1.NEXT(function () {
            
            t.fail("'NEXT' was reached in presense of error")
            
        }).CATCH(function (e) {
            t.ok(e == 'odd', 'Odd sum was detected')
            
            this.RETURN('recover')
            
        }).FINALLY(function () {
            
            t.pass("'FINALLY' was reached anyway #1")
            
            this.RETURN()
            
        }).THEN(function (res) {
            t.pass("'THEN' was reached even in presense of error")
            
            t.ok(res == 'recover', 'THEN received recovery value from CATCH')
            
            t.endAsync(async1)
        })
        

        //======================================================================================================================================================================================================================================================
        t.diag('Basic method call - without error')
        
        var async2 = t.beginAsync()
        
        cps.checkEven(1, 11).NEXT(function (res) {
            
            t.ok(res == 'even', 'Even sum was passed into NEXT')
            
            t.pass("'NEXT' was correctly reached")
            
            this.RETURN(res)
            
        }).CATCH(function (e) {
            
            t.fail("'CATCH' was reached in absense of error")
            
        }).FINALLY(function () {
            
            t.pass("'FINALLY' was reached anyway #2")
            
            this.RETURN()
            
        }).THEN(function (res) {
            
            t.ok(res == 'even', 'Even sum was passed into THEN')
            
            t.endAsync(async2)
        })
        
        
        //======================================================================================================================================================================================================================================================
        t.diag('Basic method call - without error')
        
        
        t.endAsync(async0)
    })
    
})    