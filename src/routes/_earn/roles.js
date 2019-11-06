const filterRolesById = [
  11616341, // Operations
  11643911 // Ecosystem
];

function findByIds(ids, items) {
  return ids.map(id => items.find(i => i.id === id)).filter(Boolean);
}

export function fetchRoles() {
  return fetch('https://5dyzhjgo63.execute-api.eu-west-1.amazonaws.com/prod/roles')
    .then(response => response.json())
    .then(filterRoles)
    .then(data => {
      data.roles.forEach(role => {
        role.accountabilities = findByIds(role.links.accountabilities, data.linked.accountabilities);
        role.domains = findByIds(role.links.domains, data.linked.domains);
      });
      return data;
    });
}

function filterRoles(data) {
  data.roles = data.roles.filter(item =>
    item.links.circle
    && !item.is_core
    && !item.links.people.length
    && !~filterRolesById.indexOf(item.id)
  );
  return data;
}
