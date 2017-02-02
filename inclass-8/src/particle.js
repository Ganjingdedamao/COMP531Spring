const random = (min=0, max=800) =>
    Math.random() * (max - min) + min

// default values
const particle = ({
    mass=random(5, 30),
    position=[random(), random()],
    velocity=[random(-0.1, 0.1), random(-0.1, 0.1)],
    acceleration=[0, 0]
} = {}) => {
    return {acceleration, velocity, position, mass}
}

const update = ({acceleration, velocity, position, mass}, delta, canvas) => {
	//check whether the ball is out of canvas, four sides
	if(position[0]<0)
	{
		position[0]=0
		if(velocity[0]<0)
			velocity[0]=0-velocity[0]
	}
	if(position[1]<0)
	{
		position[1]=0
		if(velocity[1]<0)
			velocity[1]=0-velocity[1]
	}
	if(position[0]>canvas.width)
	{
		position[0]=canvas.width
		if(velocity[0]>0)
			velocity[0]=0-velocity[0]
	}
	if(position[1]>canvas.height)
	{
		position[1]=canvas.height
		if(velocity[1]>0)
			velocity[1]=0-velocity[1]
	}
	//update position
	position[0]=position[0]+velocity[0]*delta
	position[1]=position[1]+velocity[1]*delta
	//update velocity
	velocity[0]=velocity[0]+acceleration[0]*delta
	velocity[1]=velocity[1]+acceleration[1]*delta

    return {acceleration, velocity, position, mass}
}

export default particle

export { update }

