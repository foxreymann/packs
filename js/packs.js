function Packs(data) {
  this.data = data;

  this.template = _.template($('#packtpl').text());
}

Packs.prototype.init = function() {
  jQuery('#sort li a').on('click', this.changeSort.bind(this));
  jQuery(this.buildPackUI.bind(this, this.data));
  
  return this;
};

Packs.prototype.buildPackUI = function(packData) {
  var $ = jQuery.noConflict();

  $('#packs *').remove();

  packData.packs.forEach(function(pack) {
      $('#packs').append(this.template(pack));
  }.bind(this));
};

Packs.prototype.sortByFieldCallback = function(sortField, sortType, a, b) {
  if (sortType === 'number') {
      return parseInt(a[sortField], 10) - parseInt(b[sortField], 10);
  } else if (sortType === 'string') {
      return a[sortField].localeCompare(b[sortField]);
  }
};

Packs.prototype.sortPacks = function(sortField, sortType) {
  var newData = JSON.parse(JSON.stringify(this.data)); // Clone the data in a simple manner

  newData.packs.sort(this.sortByFieldCallback.bind(this, sortField, sortType));

  this.buildPackUI(newData);
};

Packs.prototype.changeSort = function(event) {
  event.preventDefault();

  var sortField = jQuery(event.target).parent().data('sort');
  var sortType = jQuery(event.target).parent().data('sort-type');

  if (sortField === 'none') {
      this.buildPackUI(this.data);
  } else {
      this.sortPacks(sortField, sortType);
  }

  return false;
};

var packs = new Packs(data).init();
