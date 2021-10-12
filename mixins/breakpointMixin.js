export const breakpointMixin = {
    data() {
        return {
            isMobile: false,
            isTablet: false,
        }
    },
    created() {
        this.$checkBreakpoint();
        if (process.client) window.addEventListener('resize', this.$checkBreakpoint);
    },
    methods: {
        $checkBreakpoint() {
            if (process.client) this.isTablet = window.innerWidth < 768; // sm breakpoint of tailwind
            if (process.client) this.isMobile = window.innerWidth < 640; // sm breakpoint of tailwind
        },
    } 
}
// TODO change hardcoded 640 to import of tailwind config:
// CHECK not sure if this is good performancewise (is tailwind js built to static site?)
// import resolveConfig from 'tailwindcss/resolveConfig'
// import tailwindConfig from './tailwind.config.js'
// const twConfig = resolveConfig(tailwindConfig)
// twConfig.theme.screens.md