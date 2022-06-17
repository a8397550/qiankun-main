function render(props) {
  var container = document.getElementById(props.container);

  container.innerHTML = 'hello world';
}

((global) => {
  global['__pad_show_build_library__'] = {
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

      return render(props);
    },
    unmount: () => {
      console.log('purehtml unmount');
      return Promise.resolve();
    },
  };
})(window);
