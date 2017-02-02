import { expect } from 'chai'
import particle from './particle'
import { update } from './particle'

describe('Particle Functionality', () => {

    it('should have default values', () => {
        const p = particle({})
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
        //check position
        expect(p.position).to.be.ok
        //check velocity
        expect(p.velocity).to.be.ok
        //check acceleration
        expect(p.acceleration).to.be.ok
        //check mass
        expect(p.mass).to.be.ok
    })

    it('should update the position by the velocity', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        //update
        const { position } = update(p, 1.0, {width: 800, height: 800})
        //check updated position
        expect(position[0]).to.closeTo(1.5,0)
        expect(position[1]).to.closeTo(0.5,0)
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        //update
        const { position } = update(p, 2.0, {width: 800, height: 800}) // dt is different here
        //check whether position is updated by the velocity and time delta
        expect(position[0]).to.closeTo(2.0,0)
        expect(position[1]).to.closeTo(0.0,0)
    })

    it('should update the velocity by the acceleration', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5], acceleration: [1, 1]})
        //update
        const { velocity } = update(p, 1.0, {width: 800, height: 800}) // dt is different here
        //check updated velocity
        expect(velocity[0]).to.closeTo(1.5,0)
        expect(velocity[1]).to.closeTo(0.5,0)
        expect(1).to.equal(1)
    })

    it('particles should wrap around the world', () => {
        const p = particle({ position: [1000, 1000], velocity: [0.5, -0.5], acceleration: [1, 1]})
        //update
        const { position } = update(p, 1.0, {width: 800, height: 800}) // dt is different here
        //check four sides
        expect(position[0]).to.be.at.least(0);
        expect(position[1]).to.be.at.least(0);
        expect(position[0]).to.be.at.most(800);
        expect(position[1]).to.be.at.most(800);
        expect(1).to.equal(1)
    })

})