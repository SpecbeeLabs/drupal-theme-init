((Drupal, once) => {
  Drupal.behaviors.button = {
    attach: (context) => {
      once('my-button', '.my-button', context).forEach((button) => {
        let counter = 0;
        if (!button) {
          return;
        }
        button.addEventListener('click', (event) => {
          const { currentTarget } = event;
          event.preventDefault();
          counter += 1;
          currentTarget.innerHTML = `${currentTarget.innerHTML.replace(
            / \([0-9]*\)$/,
            '',
          )} (${counter})`;
        });
      });
    },
  };
})(Drupal, once);
