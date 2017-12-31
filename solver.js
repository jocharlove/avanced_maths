var Solver={

    VERSION    : '1.0',
    AUTHOR     : 'Josué CHARLES, ing.-agronome',
    DATE       :  '2017/12/18',
    
    
    
    
    tools:{
    
        stop: 0,
        clean: function(A){

            var size=math.size(A),
                m=size[0], n=size[1],
                L=math.zeros([n]), B=[];
            
            for(var i=0, f; i<m; i++){
               f=this.rowExt(A, i);
               if(!math.deepEqual(L, f))
                   B.push(f); 
            }
            
            if(math.size(B)[0]==0)
               return [];
        
            this.stop++;
            if(this.stop==2){
                this.stop=0;
                return math.transpose(B);
            } 
            
                 
             return this.clean( 
                          math.transpose(B));
        },
        
        rowExt: function (A, i){
           var n=math.size(A)[1];
           var f=math.subset(A, math.index(i,math.range(0, n)));
           if(math.typeof (f)=='number')
               f=[f];
           else
              f=math.reshape(f, [n]) ;
           return f; 
        },
        
        
    },
    
    
    operationsMatrices:{
        
    
        rg: function(A){
        
            A=Solver.tools.clean(A);
            
            if(A.length==0)
                return 0;
                
            var r=0, auxiliary,
                size=math.size(A),
                m=size[0], n=size[1];
                
            if(m==1 || n==1) 
                return 1;
                 
            var perm;  
            for(var t=0; t<n; t++){
                if(A[t][0]){
                   perm=A[0][0];
                   auxiliary= A[t][0];
                   A[0][0]= A[t][0]/auxiliary;
                   A[t][0]=perm;
                    break;
                }
            }
    
            for(var j=1; j<n; j++){
                 perm=A[0][j];                    
                 A[0][j]= A[t][j]/
auxiliary ;
                  A[t][j]=perm;
           }    
            
            var B=math.eye(m).valueOf();
           
            
            for(var i=0; i<m; i++)
               B[i][0]=-A[i][0];
            
            A=math.subset(math.multiply(B, A), math.index(math.range(1, m), math.range(1, n)))
            
            if(math.typeof (A)=='number')
                A=[[A]];
            r+=1+this.rg(A);
     
            return r;
        },
        
        
    },
    
    
    linearEuation:{
        
    },
    
    
    linearProgram:{
        
    },
    erreurs:{
        erreurDim: "",
        erreurDet:"",
        erreurRg: "",
        erreurInv: "",
    },
};
