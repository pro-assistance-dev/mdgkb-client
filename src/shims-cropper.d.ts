declare module 'vue-advanced-cropper' {
  import Vue, { VueConstructor } from 'vue';

  type CombinedVueInstance<Instance extends Vue, Data, Methods, Computed, Props> = Data & Methods & Computed & Props & Instance;

  type ExtendedVue<Instance extends Vue, Data, Methods, Computed, Props> = VueConstructor<
    CombinedVueInstance<Instance, Data, Methods, Computed, Props> & Vue
  >;

  const Cropper: ExtendedVue<
    Vue,
    Record<string, unknown>,
    Record<string, unknown>,
    Record<string, unknown>,
    {
      url?: string;
      maxWidth?: number;
      stencilProps?: {
        handlers?: unknown;
        movable?: boolean;
        scalable?: boolean;
        aspectRatio?: number;
      };
      defaultBoundaries?: string;
      imageRestriction?: string;
    }
  >;

  export { Cropper };
}
