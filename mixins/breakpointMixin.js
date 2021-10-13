import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '~/tailwind.config.js'
const twConfig = resolveConfig(tailwindConfig)

export const breakpointMixin = {
    data() {
        return {
            isXS: false,
            isSM: false,
            isMD: false,
            isLG: false,
            isXL: false,
            is2XL: false,
            is3XL: false,
            breakpoints: {
                xs: parseInt(twConfig.theme.screens.xs.slice(0, -2)),
                sm: parseInt(twConfig.theme.screens.sm.slice(0, -2)),
                md: parseInt(twConfig.theme.screens.md.slice(0, -2)),
                lg: parseInt(twConfig.theme.screens.lg.slice(0, -2)),
                xl: parseInt(twConfig.theme.screens.xl.slice(0, -2)),
                '2xl': parseInt(twConfig.theme.screens['2xl'].slice(0, -2)),
                '3xl': parseInt(twConfig.theme.screens['3xl'].slice(0, -2)),
            }
        }
    },
    created() {
        if (process.client) window.addEventListener('resize', this.$checkBreakpoints);
        this.$checkBreakpoints();
    },
    beforeDestroy() { 
        if (process.client) window.removeEventListener('resize', this.$checkBreakpoints); 
    },
    methods: {
        $checkBreakpoints() {
            if (process.client) {
                this.isXS = window.innerWidth >= this.breakpoints.xs
                this.isSM = window.innerWidth >= this.breakpoints.sm
                this.isMD = window.innerWidth >= this.breakpoints.md
                this.isLG = window.innerWidth >= this.breakpoints.lg
                this.isXL = window.innerWidth >= this.breakpoints.xl
                this.is2XL = window.innerWidth >= this.breakpoints['2xl'] 
                this.is3XL = window.innerWidth >= this.breakpoints['3xl']
            }
        },
    } 
}
