import { shallowMount } from '@vue/test-utils'
import Coupon from '../src/components/Coupon.vue'

describe('Coupon.vue', () => {
    let  wrapper;

    beforeEach(()=> wrapper = shallowMount(Coupon))

    it('Vue cupone test', () => {
        expect(wrapper.contains('input#couponCode')).toBe(true)
    })

    it('validate a real coupon code', () => {
        setCuponCode('50FF');

        expect(wrapper.html()).toContain('Coupon Redemed 50% off!')
    })

    it('validate a fake coupon code', () => {
        setCuponCode('NOVALID');

        expect(wrapper.html()).toContain('Invalid Coupon Code')
    })

    it('broadcast the percentage discount when a valid coupon code is applied',() => {
        /*
        wrapper.setData({code: '50FF'})
        wrapper.vm.validate()
        */

        setCuponCode('50FF');

        expect(wrapper.emitted().applied).toBeTruthy()
        expect(wrapper.emitted().applied[0]).toEqual([50])
    })

    function setCuponCode(code) {
        let couponCode = wrapper.find('input#couponCode');
        couponCode.element.value = code;
        couponCode.trigger('input');
    }
})