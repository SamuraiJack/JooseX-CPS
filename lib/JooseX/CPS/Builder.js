Class('JooseX.CPS.Builder', {
    
    use : [
        'JooseX.CPS.MethodModifier.Put',
        'JooseX.CPS.MethodModifier.After',
        'JooseX.CPS.MethodModifier.Before',
        'JooseX.CPS.MethodModifier.Override'
    ],
    
    isa : Joose.Managed.Builder,
    
    
    methods : {
        
        methods : function (meta, info) {
            var methods = meta.stem.properties.methods
            
            Joose.O.eachSafe(info, function (value, name) {
                methods.addProperty(name, {
                    meta : JooseX.CPS.MethodModifier.Put,
                    init : value
                })
            })
        },
        
    
        after : function (meta, info) {
            Joose.O.each(info, function (value, name) {
                meta.addMethodModifier(name, value, JooseX.CPS.MethodModifier.After)
            }, this)
        },
        
        
        before : function (meta, info) {
            Joose.O.each(info, function (value, name) {
                meta.addMethodModifier(name, value, JooseX.CPS.MethodModifier.Before)
            }, this)
        },
        
        
        override : function (meta, info) {
            Joose.O.each(info, function (value, name) {
                meta.addMethodModifier(name, value, JooseX.CPS.MethodModifier.Override)
            }, this)
        },
        
        
        have : function () {
            throw "'have' builder is not supported in the 'continued' section"
        },
        
        
        havenot : function () {
            throw "'havenot' builder is not supported in the 'continued' section"
        },
        
    
        around : function () {
            throw "'around' builder is not supported in the 'continued' section"
        },
        
        
        augment : function () {
            throw "'augment' builder is not supported in the 'continued' section"
        },
        
        
        does : function () {
            throw "'does' builder is not supported in the 'continued' section"
        },
        
    
        doesnot : function () {
            throw "'doesnot' builder is not supported in the 'continued' section"
        }
    }
})
