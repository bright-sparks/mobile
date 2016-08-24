define([
    'backbone',
    'model/course-event'
], function (Backbone, CourseEventModel) {
    var CourseEventsCollection = Backbone.Collection.extend({
        model: CourseEventModel,
        fetch: function (options) {
            var self = this,
                deferred = new $.Deferred();

            $.post(options.campus.url + '/main/webservices/api/v2.php', {
                api_key: options.campus.apiKey,
                username: options.campus.username,
                action: 'course_agenda',
                c_id: options.courseId
            })
                .done(function (response) {
                    if (response.error) {
                        deferred.reject(response.message);

                        return;
                    }

                    response.data.forEach(function (event) {
                        self.add(event);
                    });

                    deferred.resolve();
                })
                .fail(function () {
                    deferred.reject();
                });

            return deferred.promise();
        }
    });

    return CourseEventsCollection;
});