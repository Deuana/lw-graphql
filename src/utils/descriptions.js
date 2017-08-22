export const describeLoadoutItem = ({ quantity, kind, item }) => (
  `(${quantity}) - ${describeItem(kind, item)}`
);

export const describeItem = (kind, { description, manufacturer, model }) => (
  kind === 'Weapon' ? `${manufacturer}|${model}` : description
);

export const describeLoadoutItems = items => (
  `<ul><li>${items.map(describeLoadoutItem).join('</li><li>')}</li></ul>`
);
