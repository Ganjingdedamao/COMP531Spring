import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { findDOMNode } from 'react-dom'
import { expect } from 'chai'

import { ToDoItem } from './todoItem'

const findByClassname = (children, classname) => {
    const result = Array.prototype.filter.call(children, it => it.className.indexOf(classname) >= 0)
    return result.length ? result[0] : null
}

describe('Validate ToDoItem', () => {

    it('should display a single ToDo with text', () => {
        // use TestUtils.renderIntoDocument
        // findDOMNode and assert 3 children of the ToDoItem element
        // assert the innerHTML of the todo is the text you initially set
        const mytodo = TestUtils.renderIntoDocument(<div>
            <ToDoItem id={0} text='test_text' done={false} toggle={()=>{}} remove={()=>{}}/>
        </div>)
        const mytodoitem = findDOMNode(mytodo).children[0]
        expect(mytodoitem.children).to.have.length(3)
        expect(mytodoitem.children[1].innerHTML).to.equal("test_text")

    })

    it('should display a single ToDo with no classname', () => {
        // use TestUtils.renderIntoDocument
        // findDOMNode and assert 3 children of the ToDoItem element
        // assert there is no child with classname 'completed'
        const mytodo = TestUtils.renderIntoDocument(<div>
            <ToDoItem id={0} text='test_text' done={false} toggle={()=>{}} remove={()=>{}}/>
        </div>)
        const mytodoitem = findDOMNode(mytodo).children[0]
        expect(mytodoitem.children).to.have.length(3)
        const result = findByClassname(mytodoitem.children, 'completed')
        expect(result).to.equal(null)
        
        
    })

    it('should toggle completed when clicked', () => {
        let toggled = false
        // use TestUtils.renderIntoDocument
        // when the checkbox is clicked via TestUtils.Simulate.click()
        // we expect the variable toggled to be true
        const mytodo = TestUtils.renderIntoDocument(<div>
            <ToDoItem id={0} text='test_text' done={false} toggle={()=>{toggled=true}} remove={()=>{}}/>
        </div>)
        const mytodoitem = findDOMNode(mytodo).children[0]
        TestUtils.Simulate.click(mytodoitem.children[0])
        expect(toggled).to.equal(true)
    })

    it('should remove an item when clicked', () => {
        let removed = false
        // use TestUtils.renderIntoDocument
        // when the remove button is clicked via TestUtils.Simulate.click()
        // we expect the variable removed to be true
        const mytodo = TestUtils.renderIntoDocument(<div>
            <ToDoItem id={0} text='test_text' done={false} toggle={()=>{toggled=true}} remove={()=>{removed=true}} />
        </div>)
        const mytodoitem = findDOMNode(mytodo).children[0]
        TestUtils.Simulate.click(mytodoitem.children[2])
        expect(removed).to.equal(true)
    })

    it('should display a completed ToDo', () => {
        // use TestUtils.renderIntoDocument
        // the item should have done=true
        // assert that the rendered className is "completed"
        const mytodo = TestUtils.renderIntoDocument(<div>
            <ToDoItem id={0} text='test_text' done={true} toggle={()=>{toggled=true}} remove={()=>{}}/>
        </div>)
        const mytodoitem = findDOMNode(mytodo).children[0]
        expect(mytodoitem.children[1].className).to.equal("completed")

    })

})
