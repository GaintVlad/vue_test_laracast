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

    it('reduce countdown every second', async ()=>{
        see('10 Seconds')
        clock.tick(1000)
        await wrapper.vm.$nextTick()

        see('9 Seconds')
    })

    it('it shows an expired message when the countdown has completed', async ()=>{
        see('10 Seconds')
        clock.tick(10000)
        await wrapper.vm.$nextTick()

        see('Now Expired')
    })

    it('it shows a custom expired message when the countdown has completed', async ()=>{
        wrapper.setProps({expiredText: 'Context is over.'})

        see('10 Seconds')
        clock.tick(10000)
        await wrapper.vm.$nextTick()

        see('Context is over.')
    })

    it('broadcast when the countdown is finished', async ()=>{
        see('10 Seconds')
        clock.tick(10000)

        await wrapper.vm.$nextTick()

        expect(wrapper.emitted().finished).toBeTruthy()

    })

    it('clears the interval once completed', async ()=>{
        see('10 Seconds')
        clock.tick(10000)
        expect(wrapper.vm.now.getSeconds()).toBe(10)

        await wrapper.vm.$nextTick()

        clock.tick(5000)
        expect(wrapper.vm.now.getSeconds()).toBe(10)


    })

    const see = (text, selector) => {
        let wrap = selector ? wrapper.find(selector) : wrapper;
        expect(wrap.html()).toContain(text);
    }
});