(function() {
  
  const rolesHolder = document.getElementById('roles');
  const filterRolesById = [
    11616341,   // Operations
    11643911    // Ecosystem
  ];

  // fetch roles
  const fetchRoles = () =>
    fetch('https://5dyzhjgo63.execute-api.eu-west-1.amazonaws.com/prod/roles')
    .then(response => response.json())
    .then(filterRoles)
    .then(printRoles)
    .catch(err => {
      console.error(err);
      rolesHolder.innerHTML = 'Error occurred while fetching roles.';
    });
  
  
  const filterRoles = data => {
    data.roles = data.roles.filter(item =>
      item.links.circle
      && !item.is_core
      && !item.links.people.length
      && !~filterRolesById.indexOf(item.id)
    );
    return data;
  };
  
  
  const idCache = {};
  const findById = (id, from) => {
    var found = null;
    if (id in idCache) return idCache[id];
    for (var i=0; i<from.length; i++) {
      if (from[i].id === id) {
        found = from[i];
        idCache[from[i].id] = from[i];
        break;
      }
    }
    return found;
  };
  const listLinked = (from, ids, asTags) => {
    var out = asTags ? '' : '<ul class="small compact">';
    ids.forEach(id => {
      const found = findById(id, from);
      if (found) out += asTags ? `<span class="tag">${found.description}</span>` : `<li>${found.description}</li>`;
    });
    out += asTags ? '' : '</ul>';
    return out;
  };
  
  
  const printRoles = data => {
    rolesHolder.innerHTML = '';
    var html = '';
    data.roles.map(item => {
      html += `
        <div>
          <p>
            <span class="glassfrog"></span>
            <big>${item.name_with_circle_for_core_roles}</big>
            <br/>
            <small>
              <strong>Purpose:</strong> ${item.purpose}
              <br/><strong>Accountabilities:</strong>
            </small>
          </p>
            ${listLinked(data.linked.accountabilities, item.links.accountabilities)}
          <p class="compact">
            <small>
              <strong>Domains:</strong>
            </small>
            ${listLinked(data.linked.domains, item.links.domains, true)}
          </p>
        </div>`;
    });
    rolesHolder.innerHTML = html;
  };
  
  fetchRoles();
  
})();
