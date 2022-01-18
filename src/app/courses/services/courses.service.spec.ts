import { TestBed } from "@angular/core/testing";
import { CoursesService } from "./courses.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { COURSES } from "../../../../server/db-data";
import { Course } from "../model/course";
import { HttpErrorResponse } from "@angular/common/http";

describe('CoursesService', () => {

  let coursesService: CoursesService,
      httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CoursesService
      ]
    });

    coursesService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  })


  it('should find all courses', () => {

    coursesService.findAllCourses()
      .subscribe(courses => {
        expect(courses).toBeTruthy('No courses returned');
        expect(courses.length).toBe(12, 'incorrect number of courses');

        const course = courses.find(course => course.id = 12);
        expect(course.titles.description).toBe(
          'Serverless Angular with Firebase Course'
        )
      });

      const req = httpTestingController.expectOne('/api/courses')
      expect(req.request.method).toEqual('GET');

      req.flush({payload: Object.values(COURSES)});

  });


  it('should find one course by id', () => {

    coursesService.findCourseById(12)
      .subscribe(course => {
        expect(course).toBeTruthy();
        expect(course.id).toBe(12);
      });

      const req = httpTestingController.expectOne('/api/courses/12')
      expect(req.request.method).toEqual('GET');

      req.flush(COURSES[12]);

  });

  it('should save the course data', () => {
    const changes: Partial<Course> = {titles: {description: 'Testing Couse'}}
    coursesService.saveCourse(12, changes).
      subscribe(course => {
        expect(course.id).toBe(12);
      });

      const req = httpTestingController.expectOne('/api/courses/12');

      expect(req.request.method).toEqual('PUT');

      expect(req.request.body.titles.description).toEqual(changes.titles.description);

      req.flush(
        {...COURSES[12],
        ...changes}
      );

    });

    it('should give an error if save couse fails', () => {
      const changes: Partial<Course> = {titles: {description: 'Testing Course'}}

      coursesService.saveCourse(12, changes)
        .subscribe(
          () => fail("the save course should have failed"),
          (error: HttpErrorResponse) => {
            expect(error.status).toBe(500);
          }
        );

        const req = httpTestingController.expectOne('/api/courses/12');

        expect(req.request.method).toEqual('PUT');

        req.flush('Save course failed', { status: 500, statusText:'Internal Server Error'})
    });

    afterEach(() => {
      httpTestingController.verify(); // only one request has been made - expected at the end
    });



});
