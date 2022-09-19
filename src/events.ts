export function subscribe(eventName: string, listener: VoidFunction) {
  document.addEventListener(eventName, listener);
}

export function unsubscribe(eventName: string, listener: VoidFunction) {
  document.removeEventListener(eventName, listener);
}

export function publish<T>(eventName: string, data?: T) {
  const event = new CustomEvent(eventName, { detail: data });

  document.dispatchEvent(event);
}
