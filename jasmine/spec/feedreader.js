/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* To check allFeeds' URL is defined and not empty  */
        it('all has URL', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            })

        });


        /* To check that allFeeds' name is defined and not empty */
        it('all has name', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });


    describe('The menu', function () {
        var body = document.querySelector('body');
        var menuIcon = $('.menu-icon-link');

        /* To check the menu is hidden by default */
        it('is hidden by default', function () {
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        /* To check the menu will show/hide when the hamburger menu icon is clicked */
        it('will click and show the menu, click then hide the menu', function () {
            menuIcon.trigger('click');
            expect(body.classList.contains('menu-hidden')).not.toBe(true);
            menuIcon.trigger('click');
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    /* To check loadFeed() function is working well and there is at least one single .entry element load into .feed container */
    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });
        it('has at least a single .entry element within the .feed container', function (done) {
            expect($('.feed').find('.entry').length > 0).toBe(true);
            done();
        });
    });

    /* To check if a new feed is loaded and the content will change accordingly */
    describe('New Feed Selection', function () {
        var firstTitle, secondTitle;
        beforeEach(function (done) {
            loadFeed(0, function () {
                firstTitle = $('.feed').html();
                console.log(firstTitle);
                loadFeed(1, function () {
                    secondTitle = $('.feed').html();
                    console.log(secondTitle)
                    done();
                })
            })
        });
        it('will change the content after loadFeed function', function (done) {
            expect(firstTitle !== secondTitle).toBe(true);
            done();
        })
    });
}());