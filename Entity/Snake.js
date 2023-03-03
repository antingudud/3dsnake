import * as THREE from '../node_modules/three/build/three.module.js';

/**
 * Create a snake Object3D
 */
export class Snake
{
    head;
    bodyParts = Array();
    length;
    tail;
    group;
    geometry;
    color;
    lifeStatus;
    heading;

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
        this.tail = this.length - 1;
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
        this.tail = this.length - 1;
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
        this.bodyParts.forEach((object, index) =>
        {
            object.position.x = this.head.position.x;
            object.position.y = this.head.position.y - 1;
        })
        this.heading = 'north';
    }
    moveDownward()
    {
        this.head.position.y -= 1;
        this.bodyParts.forEach((object, index) =>
        {
            object.position.x = this.head.position.x;
            object.position.y = this.head.position.y + 1;
        })
        this.heading = 'south';
    }
    moveLeft()
    {
        this.head.position.x -= 1;
        this.bodyParts.forEach((object, index) =>
        {
            object.position.y = this.head.position.y;
            object.position.x = this.head.position.x + 1;
        })
        this.heading = 'west';
    }
    moveRight()
    {
        this.head.position.x += 1;
        this.bodyParts.forEach((object, index) =>
        {
            object.position.x = this.head.position.x - 1;
            object.position.y = this.head.position.y;
        })
        this.heading = 'east';
    }

    addBody()
    {
        this.bodyPart = [];
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