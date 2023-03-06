import { Object3D, Mesh, MeshStandardMaterial, MathUtils } from '../../node_modules/three/build/three.module.js';

/**
 * Create a snake Object3D.
 * You do not need to add a Snake instance into scene as it's handled by Snake
 */
export class Snake
{
    head;
    bodyParts = Array();
    length;
    
    /**
     * @var tail last snakeBody inside bodyParts array
     */
    tail;
    group;
    geometry;
    color;
    lifeStatus;
    heading;
    bodyLastPosition = Array();

    /**
     * @param array headCoord [x, y]
     * @param array bodyCoord [x, y]
     */
    constructor( headCoord, bodyCoord, scene, geometry, color )
    {
        this.geometry = geometry;
        this.color = color;
        this.lifeStatus = 'alive';
        
        this.group = new Object3D();
        scene.add(this.group);

        this.head = new SnakeHead(headCoord[0], headCoord[1], this.group).makeInstance( this.geometry, this.color );
        this.bodyParts.push( new SnakeBody(bodyCoord[0], bodyCoord[1], this.group).makeInstance( this.geometry, this.color ) );
        this.length = this.bodyParts.length;
        this.tail = this.bodyParts[this.length - 1];
    }
    get bodyParts()
    {
        return this.bodyParts;
    }

    /**
     * create a new snake body part instance
     * 
     * @oaram array coord [x,y]
     */
    set bodyPart( coord )
    {
        this.bodyParts.push( new SnakeBody( coord[0], coord[1], this.group ).makeInstance( this.geometry, this.color ) );
        this.length = this.bodyParts.length;
        this.tail = this.bodyParts[this.length - 1];
    }
    get head()
    {
        return this.head;
    }
    get group()
    {
        return this.group;
    }

    tick($tDelta) { }

    moveUpward()
    {
        if(Number.isInteger(this.head.position.x))
        {
            this.tick = ($tDelta) => {
                // this.head.position.y += 1;
                this.head.position.y = MathUtils.damp(this.head.position.y, this.head.position.y + 1, 10, $tDelta);

                this.bodyLastPosition.push([ this.bodyParts[0].position.x, this.bodyParts[0].position.y ]);
                this.bodyParts[0].position.x = this.head.position.x;
                this.bodyParts[0].position.y = this.head.position.y - 1;
                for (let index = 1; index < this.length; index++) {
                    this.bodyLastPosition.push([ this.bodyParts[index].position.x, this.bodyParts[index].position.y ]);

                    this.bodyParts[index].position.x = MathUtils.damp(this.bodyParts[index].position.x, this.bodyLastPosition[0][0], 10, $tDelta);
                    this.bodyParts[index].position.y = MathUtils.damp(this.bodyParts[index].position.y, this.bodyLastPosition[0][1], 10, $tDelta);

                    this.bodyLastPosition.shift()
                }
                this.bodyLastPosition.shift();
                this.heading = 'north';
            }
        } else
        {
            this.head.position.x = Math.round(this.head.position.x);
            this.moveUpward();
        }
    }
    moveDownward()
    {
        if(Number.isInteger(this.head.position.x))
        {
            this.tick = ($tDelta) => {
                // this.head.position.y -= 1;
                this.head.position.y = MathUtils.damp(this.head.position.y, this.head.position.y -1, 10, $tDelta);
                
                this.bodyLastPosition.push([ this.bodyParts[0].position.x, this.bodyParts[0].position.y ]);
                this.bodyParts[0].position.x = this.head.position.x;
                this.bodyParts[0].position.y = this.head.position.y + 1;
                for (let index = 1; index < this.length; index++) {
                    this.bodyLastPosition.push([ this.bodyParts[index].position.x, this.bodyParts[index].position.y ]);

                    this.bodyParts[index].position.x = MathUtils.damp(this.bodyParts[index].position.x, this.bodyLastPosition[0][0], 10, $tDelta);
                    this.bodyParts[index].position.y = MathUtils.damp(this.bodyParts[index].position.y, this.bodyLastPosition[0][1], 10, $tDelta);

                    this.bodyLastPosition.shift()
                }
                this.bodyLastPosition.shift();
                this.heading = 'south';
            }
        } else
        {
            this.head.position.x = Math.round(this.head.position.x);
            this.moveDownward();
        }
    }
    moveLeft()
    {
        if(Number.isInteger(this.head.position.y))
        {
            this.tick = ($tDelta) => {
            // this.head.position.x -= 1;
                this.bodyLastPosition.push([ this.head.position.x, this.head.position.y ]);
                this.head.position.x = MathUtils.damp(this.head.position.x, this.head.position.x - 1, 10, $tDelta);

                this.bodyLastPosition.push([ this.bodyParts[0].position.x, this.bodyParts[0].position.y ]);
                this.bodyParts[0].position.x = MathUtils.damp(this.bodyParts[0].position.x, this.bodyLastPosition[0][0], 10, $tDelta);
                this.bodyParts[0].position.y = this.head.position.y;
                this.bodyLastPosition.shift();
                for (let index = 1; index < this.length; index++) {
                    this.bodyLastPosition.push([ this.bodyParts[index].position.x, this.bodyParts[index].position.y ]);

                    this.bodyParts[index].position.x = MathUtils.damp(this.bodyParts[index].position.x, this.bodyLastPosition[0][0], 10, $tDelta);
                    this.bodyParts[index].position.y = MathUtils.damp(this.bodyParts[index].position.y, this.bodyLastPosition[0][1], 10, $tDelta);

                    this.bodyLastPosition.shift()
                }
                this.bodyLastPosition.shift();
                this.heading = 'west';
            }
        } else
        {
            this.head.position.y = Math.round(this.head.position.y);
            this.moveLeft();
        }
    }
    moveRight()
    {
        if(Number.isInteger(this.head.position.y))
        {
            this.tick = ($tDelta) => {
                this.head.position.x = MathUtils.damp(this.head.position.x, this.head.position.x + 1, 10, $tDelta);
    
                this.bodyLastPosition.push([ this.bodyParts[0].position.x, this.bodyParts[0].position.y ]);
                this.bodyParts[0].position.x = this.head.position.x - 1;
                this.bodyParts[0].position.y = this.head.position.y;

                for (let index = 1; index < this.length; index++) {
                    this.bodyLastPosition.push([ this.bodyParts[index].position.x, this.bodyParts[index].position.y ]);

                    this.bodyParts[index].position.x = MathUtils.damp(this.bodyParts[index].position.x, this.bodyLastPosition[0][0], 10, $tDelta);
                    this.bodyParts[index].position.y = MathUtils.damp(this.bodyParts[index].position.y, this.bodyLastPosition[0][1], 10, $tDelta);

                    this.bodyLastPosition.shift()
                }
                this.bodyLastPosition.shift();
                this.heading = 'east';
            }
        } else
        {
            this.head.position.y = Math.round(this.head.position.y);
            this.moveRight();
        }
    }

    /**
     * Increase snake's body and place it in the tail's position
     */
    addBody()
    {
        this.bodyPart = [this.tail.position.x, this.tail.position.y];
    }
}

export class SnakeHead
{
    x;
    y;
    group;

    constructor(x,y, group)
    {
        this.x = x;
        this.y = y;
        this.group = group;
    }
    
    get x()
    {
        return this.x;
    }
    set x(x)
    {
        this.x = x;
    }

    get y()
    {
        return this.y;
    }
    set y(y)
    {
        this.y = y;
    }

    makeInstance(geometry, color)
    {
        const material = new MeshStandardMaterial( {color:0x2233FF} );
        const snakeHead = new Mesh( geometry, material );
        this.group.add(snakeHead);
        snakeHead.position.set( this.x, this.y );

        return snakeHead;
    }
}

export class SnakeBody
{
    x;
    y;
    group;
    
    constructor(x,y, group)
    {
        this.x = x;
        this.y = y;
        this.group = group;
    }
    get coord()
    {
        return [this.x, this.y];
    }
    
    makeInstance(geometry, color)
    {
        const material = new MeshStandardMaterial( {color, wireframe: true} );
        const snakeBody = new Mesh( geometry, material );
        this.group.add(snakeBody);
        snakeBody.position.set( this.x, this.y );

        return snakeBody;
    }
}