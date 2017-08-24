(function () {
    'use strict';
    angular.module('ng-file-model', []).directive("ngFileModel", [function () {
        return {
            scope: {
                ngFileModel: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    for (var i = 0; i < changeEvent.target.files.length; i++) {
                        setupReader(changeEvent.target.files[i]);
                    }

                    function setupReader(file) {
                        var fileObj = {},
                            reader = new FileReader();

                        reader.onload = function (e) {
                            scope.$apply(function () {
                                var eSplit = e.target.result.split(',');
                                fileObj = {
                                    lastModified: file.lastModified,
                                    lastModifiedDate: file.lastModifiedDate,
                                    name: file.name,
                                    size: file.size,
                                    type: file.type,
                                    data: eSplit[1]
                                };
                                scope.ngFileModel.push(fileObj);
                            });
                            element[0].value = '';
                        };
                        //this sets the value of e.target.results.
                        reader.readAsDataURL(file);
                    }
                });
            }
        };
    }]);

    if (typeof exports !== 'undefined') {
        exports['default'] = angular.module('ng-file-model');
        module.exports = exports['default'];
    }
})();
