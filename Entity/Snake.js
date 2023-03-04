import * as THREE from '../node_modules/three/build/three.module.js';

/**
 * Create a snake Object3D
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
        
        this.group = new THREE.Object3D();
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

    moveUpward()
    {
        this.head.position.y += 1;
        this.bodyLastPosition.push([ this.bodyParts[0].position.x, this.bodyParts[0].position.y ]);
        this.bodyParts[0].position.x = this.head.position.x;
        this.bodyParts[0].position.y = this.head.position.y - 1;
        for (let index = 1; index < this.length; index++) {
            this.bodyLastPosition.push([ this.bodyParts[index].position.x, this.bodyParts[index].position.y ]);

            this.bodyParts[index].position.x = this.bodyLastPosition[0][0];
            this.bodyParts[index].position.y = this.bodyLastPosition[0][1];

            this.bodyLastPosition.shift()
        }
        this.bodyLastPosition.shift();
        this.heading = 'north';
    }
    moveDownward()
    {
        this.head.position.y -= 1;
        this.bodyLastPosition.push([ this.bodyParts[0].position.x, this.bodyParts[0].position.y ]);
        this.bodyParts[0].position.x = this.head.position.x;
        this.bodyParts[0].position.y = this.head.position.y + 1;
        for (let index = 1; index < this.length; index++) {
            this.bodyLastPosition.push([ this.bodyParts[index].position.x, this.bodyParts[index].position.y ]);

            this.bodyParts[index].position.x = this.bodyLastPosition[0][0];
            this.bodyParts[index].position.y = this.bodyLastPosition[0][1];

            this.bodyLastPosition.shift()
        }
        this.bodyLastPosition.shift();
        this.heading = 'south';
    }
    moveLeft()
    {
        this.head.position.x -= 1;
        this.bodyLastPosition.push([ this.bodyParts[0].position.x, this.bodyParts[0].position.y ]);
        this.bodyParts[0].position.x = this.head.position.x + 1;
        this.bodyParts[0].position.y = this.head.position.y;
        for (let index = 1; index < this.length; index++) {
            this.bodyLastPosition.push([ this.bodyParts[index].position.x, this.bodyParts[index].position.y ]);

            this.bodyParts[index].position.x = this.bodyLastPosition[0][0];
            this.bodyParts[index].position.y = this.bodyLastPosition[0][1];

            this.bodyLastPosition.shift()
        }
        this.bodyLastPosition.shift();
        this.heading = 'west';
    }
    moveRight()
    {
        this.head.position.x += 1;
        this.bodyLastPosition.push([ this.bodyParts[0].position.x, this.bodyParts[0].position.y ]);
        this.bodyParts[0].position.x = this.head.position.x - 1;
        this.bodyParts[0].position.y = this.head.position.y;
        for (let index = 1; index < this.length; index++) {
            this.bodyLastPosition.push([ this.bodyParts[index].position.x, this.bodyParts[index].position.y ]);

            this.bodyParts[index].position.x = this.bodyLastPosition[0][0];
            this.bodyParts[index].position.y = this.bodyLastPosition[0][1];

            this.bodyLastPosition.shift()
        }
        this.bodyLastPosition.shift();
        this.heading = 'east';
    }

    /**
     * Increase snake's body
     */
    addBody()
    {
        let x; let y;
        switch (this.heading) {
            case "north":
                x = this.tail.position.x;
                y = this.tail.position.y - 1;
                break;
            case "south":
                x = this.tail.position.x;
                y = this.tail.position.y + 1;
                break;
            case "west":
                x = this.tail.position.x + 1;
                y = this.tail.position.y;
                break;
            case "east":
                x = this.tail.position.x - 1;
                y = this.tail.position.y;
                break;
            default:
                console.error('not adding anything');
                return false;
                break;
        }
        this.bodyPart = [x,y];
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
        const material = new THREE.MeshPhongMaterial( {color:0x2233FF} );
        const snakeHead = new THREE.Mesh( geometry, material );
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
        const material = new THREE.MeshPhongMaterial( {color} );
        const snakeBody = new THREE.Mesh( geometry, material );
        this.group.add(snakeBody);
        snakeBody.position.set( this.x, this.y );

        return snakeBody;
    }
}