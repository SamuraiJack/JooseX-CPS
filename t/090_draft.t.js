StartTest(function(t) {
    
	t.plan(1)
    
    var async1 = t.beginAsync()
	
    use('JooseX.CPS', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(JooseX.CPS, "JooseX.CPS is here")
        

        //======================================================================================================================================================================================================================================================
        t.diag('Creation')
        
        Class('CPSEnabled', {
            
            trait : JooseX.CPS,
            
            
            continued : {
                
                cpsMeta : JooseX.CPS.Continuation,
                
                methods : {
                    
                    async1 : function (CPS, param1, param2) {
                        var me  = this
                        
                        var callback = function () {
                            CPS.RETURN(result)
                        }
                        
                        var errback = function () {
                            CPS.THROW(error)
                        }
                        
                        
                        CPS.TRY(function () {
                            
                            //'this' will be stored in CPS instance
                            this.async2(CPS, param1 + param2).then(function (result) {
                                CPS.RETURN(result)
                            })/*.but(function () {
                                CPS.THROW(error)
                                
                                assumes commented code
                            })*/.now()
                            
                            //XHRRequest(callback, errback)
                            
                            
                            //the same, but will not catch "exceptions" from async2
                            this.async2(param1 + param2).then(function (result) {
                                CPS.RETURN(result)
                            })/*.but(function () {
                                CPS.THROW(error)
                                
                                assumes commented code
                            })*/.now()
                            
                            
                        }).CATCH(function (exception) {
                            
                        })
                        
                        
                        this.async2(CPS, param1 + param2).then(function (result) {
                            CPS.RETURN(result)
                        }).CATCH(function (exception) {
                            
                        }).now()

                        
                        this.async2(CPS, param1 + param2).then(function (result) {
                            CPS.RETURN(result)
                        }).now()
                    },
                    
                    
                    async2 : function () {
                    },
                    
                    
                    async3 : function () {
                    }
                },
                
                
                after : {
                    async1 : function (CPS, param1, param2) {
                        CPS.RETURN()
                    }
                }
            }
        
        })
        
        t.ok(CPSEnabled, 'CPSEnabled class was created')
        
        
        var cps = new CPSEnabled()
        
        t.ok(cps, 'CPSEnabled class was instantiated')
        

        //======================================================================================================================================================================================================================================================
        t.diag('Async calls')
        
        cps.async1().then(function (result) {
            
        }).but(function(error) {
            
        }).go()

        
        
        cps.async1(param1, param2).THEN(function (result) {
            
            //this is tied to cps
            
        }).CATCH(function(error) {
            
            //this is tied to cps            
            
        })
        
        
        cps.async1(param1, param2).then(function (result) {
            
        }).except(function(error) {
            
        }).now()
        
        
        
        cps.async1(param1, param2).TRY()
        
        
        cps.async1(param1, param2).THEN(function (result) {
            
            //this is tied to cps
            
        }).TRY()
        
        
        
        
        
        
        cps.async1(param1, param2).THEN(function (result) {
            
            //this is tied to cps
            
        }).CATCH(function(error) {
            
            //this is tied to cps            
            
        }).TRY()
        
        
        -eq-
        
        var cn = new Continuation
        
        cn.TRY(function () {
            
            cps.async1(cn, param1, param2).THEN(function (result) {
            })
            
        }).CATCH(function(error) {
        })
        
        
        
        t.endAsync(async1)
    })
    
})    