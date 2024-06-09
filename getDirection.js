// Online Java Compiler
// Use this editor to write, compile and run your Java code online

public class HelloWorld{
    
    private int x;
    private int y;
    
    public HelloWorld(){
        
        this.x = 0;
        this.y = 0;
    }
    
    public HelloWorld(int xCoord, int yCoord){
        
        this.x = xCoord;
        this.y = yCoord;
    }
    
    public int getX(){
        
        return this.x;
    }
    
    public int getY(){
        
        return this.y;
    }
    
    public void setX(int newNum){
        
        this.x = newNum;
    }
    
    public void setY(int newNum){
        
        this.y = newNum;
    }
    
    public void stringify(){

        System.out.println("x coordinate = " + this.x);
        System.out.println("y coordinate = " + this.y);
    }

    public void startingPoint(){

        console.log(arguments);

        var startx = arguments[0].getX();
        var starty = arguments[0].getY();

        for(var i = 1; i < arguments.length - 1; i++){
    
            if(starty == arguments[i].getY()){
              
              if(startx > arguments[i].getX()){
                
                startx = arguments[i].getX();
              }
              
            }
             
            if(starty < arguments[i].getY()){
              
              startx = arguments[i].getX();
              starty = arguments[i].getY();
            }
            
        }

        HelloWorld startingPoint = new HelloWorld(startx, starty);
        return this.startingPoint;
    }

    public static float direction(HelloWorld point1, HelloWorld point2, HelloWorld point3){

        float area = (point2.x - point1.x) * (point3.y - point1.y) - 
            (point2.y - point1.y) * (point3.x - point1.x);

        return area;
    }
    
    public static int crossProduct(HelloWorld point1, HelloWorld point2, HelloWorld point3){
        
        float area = (point2.x - point1.x) * (point3.y - point1.y) - 
            (point2.y - point1.y) * (point3.x - point1.x);
            
        System.out.println(area);    
        
        if(area < 0){
            
            return -1;
        }
        else if(area > 0){
            
            return 1;
        }
        else{
            
            return 0;
        }
    }

    public array grahamScan(arguments){

        HelloWorld firstPoint = startingPoints();
        ArrayList<HelloWorld> sorted_polar = new ArrayList<HelloWorld>();


        //sort the points (except p0) according to the polar angle
        //made by the line segment with x-axis in anti-clockwise direction
        for(int i = 0; i < arguments.length - 3; i++){

            HelloWorld inter = new HelloWorld();

            if(arguments[i] != firstPoint){

                inter = this.crossProduct(arguments[i],arguments[i+1],arguments[i+2]);
                sorted_polar.append(inter);
            }
            //probably incorrect logic will need to figure out how to sort correctly
            else{

                i++;
            }
        }

        ArrayList<HelloWorld> remove = new ArrayList<HelloWorld>();

        for(int i = 0; i < sorted_polar.length() - 1; i++){

            float d =  this.direction(sorted_polar[i], sorted_polar[i+1], firstPoint);

            if(d == 0){

                remove.append(i);
            }
        }

        for(int i = 0; i < sorted_polar.length() - 1; i++){
            for(int j = 0; j < remove.length(); j++){

                if(sorted_polar[i] == sorted_polar[j]){

                    if(sorted_polar[i].getX() < sorted_polar[j].getX()){

                        sorted_polar.remove(i);
                    }
                    else{

                        sorted_polar.remove(j);
                    }
                }
            }
        }

        //sorted_polar = sorted(points[1:], cmp = lambda p1, p2: polar_comparator(p1, p2, p0))
        
        /*
        //if more than two points are collinear with p0, keep the farthest
        to_remove = []
        for i in range(len(sorted_polar) - 1):
            d = direction(sorted_polar[i], sorted_polar[i + 1], p0)
            if d == 0:
                to_remove.append(i)
        sorted_polar = [i for j, i in enumerate(sorted_polar) if j not in to_remove]
    
       
        m = len(sorted_polar)
        if m < 2:
            print 'Convex hull is empty'
    
        else:
            stack = []
            stack_size = 0
            stack.append(points[0])
            stack.append(sorted_polar[0])
            stack.append(sorted_polar[1])
            stack_size = 3
    
            for i in range(2, m):
                while (True):
                    d = direction(stack[stack_size - 2], stack[stack_size - 1], sorted_polar[i])
                    if d < 0: # if it makes left turn
                        break
                    else: # if it makes non left turn
                        stack.pop()
                        stack_size -= 1
                stack.append(sorted_polar[i])
                stack_size += 1
        return stack
        */
    }
    
    public static void main(String[] args) {
        
        HelloWorld p0 = new HelloWorld(1, 1);
        HelloWorld p1 = new HelloWorld(3, 5);
        HelloWorld p2 = new HelloWorld(2, 4);
        
        //p0.stringify();
        //p1.stringify();
        //p2.stringify();
        
        int direction = crossProduct(p0,p1,p2);
        
        System.out.println(direction);
    }
    
}
