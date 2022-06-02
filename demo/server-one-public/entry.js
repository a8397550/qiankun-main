const render = (props) => {
  return Promise.resolve(props);
};

((global) => {
  global['purehtml'] = {
    bootstrap: (props) => {
      console.log('purehtml bootstrap', props);
      return Promise.resolve();
    },
    mount: (props) => {
      console.log('purehtml mount', props);
      if (props.setLoading) {
        setTimeout(() => {
          props.setLoading(false);
        }, 500);
      }

      return render();
    },
    unmount: () => {
      console.log('purehtml unmount');
      return Promise.resolve();
    },
  };
})(window);
