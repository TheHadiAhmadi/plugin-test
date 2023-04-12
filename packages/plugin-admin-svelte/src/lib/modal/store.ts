// import type { ModalProps } from "yesvelte";
import type { SvelteComponent, ComponentProps } from "svelte";
import { writable } from "svelte/store";
import type { Modal } from "yesvelte";
import ConfirmModal from "./ConfirmModal.svelte";

type ModalProps = ComponentProps<Modal>;

const defaultModalProps: ModalProps = {
  placement: "center",
  backdrop: true,
  size: "md",
};

export type ModalParams = {
  open: boolean;
  component?: new (...args: any) => SvelteComponent;
  props?: any;
  config?: ModalProps;
  close: () => void;
  resolve: (data: any) => void;
  reject: (reason: any) => void;
};

function createModalStore() {
  let { subscribe, set, update } = writable<ModalParams>();

  function open<
    Component extends SvelteComponent,
    Props extends ComponentProps<Component> | {}
  >(
    component: new (...args: any) => Component,
    props: Partial<Props> = {},
    modalProps?: ModalProps
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      function close() {
        update((modal) => ({
          ...modal!,
          open: false,
        }));
      }
      set({
        open: true,
        component,
        props,
        config: { ...defaultModalProps, ...modalProps },
        resolve: (payload: any) => {
          close();
          resolve(payload);
        },
        reject: (reason: any) => {
          close();
          reject(reason);
        },
        close() {
          close();
          resolve(false);
        },
      });
    });
  }

  function confirm(props: ComponentProps<ConfirmModal>) {
    return open(ConfirmModal, props);
  }

  function create<
    Component extends SvelteComponent,
    Props extends ComponentProps<Component>
  >(component: new (...args: any) => Component, defaultProps: Props) {
    return {
      open: (props?: Props, config?: ModalProps) =>
        open(component, { ...defaultProps, ...props }, config),
    };
  }

  return {
    subscribe,
    set,
    open,
    confirm,
    create,
  };
}
export const modal = createModalStore();
