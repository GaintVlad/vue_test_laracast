import { shallowMount } from '@vue/test-utils'
import Question from '../src/components/Question.vue'
import moxios from 'moxios';

describe('Question.vue', () => {
    let  wrapper;

    beforeEach(()=> {
        wrapper = shallowMount(Question, {
            propsData: {
                question: {
                    title: 'The Title',
                    body: 'The body'
                }
            }
        })
        moxios.install()
    });

    afterEach(() => {
        // import and pass your custom axios instance to this method
        moxios.uninstall()
    })


    it('Presents the title and the body', () => {
        see('The Title');
        see('The body', 'p');
    });

    it('can be edited', () => {
        expect(wrapper.contains('input[name=title]')).toBe(false)
        clickSelector('#edit')
        expect(wrapper.find('input[name=title]').element.value).toBe('The Title');
        expect(wrapper.find('textarea[name=body]').element.value).toBe('The body');
    });

    it('update the question after being edited', (done) => {

        clickSelector('#edit');
        type('Changed Title', 'input[name=title]');
        type('Changed body', 'textarea[name=body]');

        moxios.stubRequest(/question\/\d+/, {
            status: 200,
            response: {
                title: 'Changed Title',
                body: 'Changed body'
            }
        });

        clickSelector('#update');

        moxios.wait(()=>{
            see('Your Question was updated successfully')
            see('Changed Title');
            see('Changed body', 'p');
            done()
        })

    });

    it('can cancel out of edit mode', () => {

        clickSelector('#edit');
        type('Changed Title', 'input[name=title]');
        type('Changed body', 'textarea[name=body]');
        clickSelector('#cancel');
        see('The Title');
        see('The body', 'p');
    });

    it('hide edit button', () => {
        expect(wrapper.contains('button#edit')).toBe(true)
        clickSelector('#edit')
        expect(wrapper.contains('button#edit')).toBe(false)

    });

    const see = (text, selector) => {
        let wrap = selector ? wrapper.find(selector) : wrapper;
        expect(wrap.html()).toContain(text);
    }

    const type = (text, input) => {
        let node = wrapper.find(input);
        node.element.value = text;
        node.trigger('input');
        expect(node.element.value).toContain(text);
    }

    const clickSelector = selector => {
        wrapper.find(selector).trigger('click');
    }

})