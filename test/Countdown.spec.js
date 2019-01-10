import { shallowMount } from '@vue/test-utils'
import Countdown from '../src/components/Countdown.vue'
import moment from 'moment';
import sinon from 'sinon';


describe('Countdown.vue', () => {
    let  wrapper, clock;
    beforeEach(()=> {

        clock = sinon.useFakeTimers({global: global});
        wrapper = shallowMount(Countdown, {
            propsData: {
                until: moment().add(10, 'seconds')
            }
        })
    });
    afterEach(()=> clock.restore());

    it('render countdown timer', ()=>{
        see('0 Days')
        see('0 Hours')
        see('0 Minutes')
        see('10 Seconds')
    })

    it('reduce countdown every second', (done)=>{
        see('10 Seconds')
        clock.tick(1000)

        assertOnNextTick(()=>{
            see('9 Seconds')
        }, done);
    })

    it('it shows an expired message when the countdown has completed', (done)=>{
        see('10 Seconds')
        clock.tick(10000)

        assertOnNextTick(()=>{
            see('Now Expired')
        }, done);

    })

    it('it shows a custom expired message when the countdown has completed', (done)=>{
        wrapper.setProps({expiredText: 'Context is over.'})

        see('10 Seconds')
        clock.tick(10000)

        assertOnNextTick(()=>{
            see('Context is over.')
        }, done);
    })

    it('broadcast when the countdown is finished', (done)=>{
        see('10 Seconds')
        clock.tick(10000)

        assertOnNextTick(()=>{
            expect(wrapper.emitted().finished).toBeTruthy()
        }, done);
    })

    it('clears the interval once completed', (done)=>{
        see('10 Seconds')
        clock.tick(10000)
        expect(wrapper.vm.now.getSeconds()).toBe(10)

        assertOnNextTick(()=>{
            clock.tick(5000)
            expect(wrapper.vm.now.getSeconds()).toBe(10)
        }, done);

    })

    const see = (text, selector) => {
        let wrap = selector ? wrapper.find(selector) : wrapper;
        expect(wrap.html()).toContain(text);
    }

    const assertOnNextTick = (callback, done)  => {
        wrapper.vm.$nextTick(()=>{
            try {
            callback()
            done()
            } catch (e) {
                done(e)
            }
        })
    }
});