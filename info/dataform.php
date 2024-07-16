<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Infinite Outsource CPA | Application Form</title>
    <style>
      input {
        height: 35px;
        /* width: 250px; */
      }

      label {
        font-size: 12.5px;
        font-weight: 300;
      }
      input:focus {
        outline: rgba(2, 3, 93, 0.6) 1px solid;
      }
    </style>
  </head>
  <body class="container mx-auto">
    <section
      class="my-[10px] md:my-[5%] mx-auto w-[90%] md:max-w-[70%] p-2 border-2 border-gray-200 p-1 rounded-md"
    >
      <div class="text-center py-4 border-b-2 border-gray-500">
        <h2 class="font-[500] text-[25px] md:text-[30px] uppercase">
          Job Application
        </h2>
        <p class="font-light text-[15px]">
          Please complete the form below to apply for a position with us.
        </p>
      </div>
      <form class="mt-3" method="POST" action="process_form.php">
        <script>
          function nextStep(step) {
            const fieldsets = document.getElementsByTagName("fieldset");
            for (let i = 0; i < fieldsets.length; i++) {
              fieldsets[i].style.display = "none";
            }
            fieldsets[step - 1].style.display = "block";
          }
        </script>
        <fieldset>
          <legend class="text-center text-[16px] uppercase">
            Personal Information
          </legend>
          <!-- Add your input fields for personal information here -->
          <!-- For example: -->
          <div>
            <h3>Full Name</h3>
            <div class="flex flex-wrap gap-3 my-3 justify-between">
              <div class="basis-[48%] md:basis-[31%]">
                <input
                  class="border border-gray-400 rounded-md w-full"
                  type="text"
                  name="firstname"
                  id="firstname"
                /><br /><label>First Name</label>
              </div>
              <div class="basis-[48%] md:basis-[31%]">
                <input
                  class="border border-gray-400 rounded-md w-full"
                  type="text"
                  name="middlename"
                  id="middlename"
                />
                <br /><label>Middle Name</label>
              </div>

              <div class="basis-[100%] md:basis-[31%]">
                <input
                  class="border border-gray-400 rounded-md w-full"
                  type="text"
                  name="lastname"
                  id="lastname"
                />
                <br /><label>Last Name</label>
              </div>
            </div>
          </div>

          <div class="my-3">
            <h3>Current Address</h3>
            <input
              type="text"
              name="address"
              id="address"
              class="border border-gray-400 rounded-md w-full"
            />
            <br />
            <label for="address">Street Address</label>
          </div>

          <div>
            <!-- <h3>More on Current Address</h3> -->
            <div class="flex flex-wrap gap-3 my-3 justify-between">
              <div class="basis-[48%]">
                <input
                  class="border border-gray-400 rounded-md w-full"
                  type="text"
                  name="cityname"
                  id="cityname"
                /><br /><label>City</label>
              </div>
              <div class="basis-[48%]">
                <input
                  class="border border-gray-400 rounded-md w-full"
                  type="text"
                  name="statename"
                  id="statename"
                />
                <br /><label>State Name</label>
              </div>
            </div>
          </div>
          <div>
            <!-- <h3>More on Current Address</h3> -->
            <div class="flex flex-wrap gap-3 my-3 justify-between">
              <div class="basis-[48%]">
                <input
                  class="border border-gray-400 rounded-md w-full"
                  type="text"
                  name="PostalCode"
                  id="PostalCode"
                /><br /><label>Postal / Zip code</label>
              </div>
              <div class="basis-[48%]">
                <input
                  class="border border-gray-400 rounded-md w-full"
                  type="text"
                  name="ssn"
                  id="ssn"
                />
                <br /><label for="ssn">Social Security Number</label>
              </div>
            </div>
          </div>

          <div class="w-full">
            <input
              class="w-full border border-gray-400 p-2 rounded-md"
              type="date"
              name="dob"
              id="dob"
            />
            <label for="dob">Date of birth</label>
          </div>

          <div class="w-full my-3">
            <select
              name="gender"
              id="gender"
              class="w-full border border-gray-400 p-2 rounded-md"
            >
              <option value="none">No gender selected</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <label for="gender">Gender</label>
          </div>

          <div class="w-full my-3">
            <select
              name="empstatus"
              id="empstatus"
              class="w-full border border-gray-400 p-2 rounded-md"
            >
              <option value="none">Select</option>
              <option value="EmployedFull-Time">Employed Full-Time</option>
              <option value="EmployedPart-Time">Employed Part-Time</option>
              <option value="SelfEmployed">Self Employed</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Retired">Retired</option>
            </select>
            <label for="empstatus">Employment Status</label>
          </div>

          <div>
            <h3>Contact Information</h3>
            <div class="flex flex-wrap gap-3 my-3 justify-between">
              <div class="basis-[48%]">
                <input
                  class="border border-gray-400 rounded-md w-full"
                  type="email"
                  name="emailAddress"
                /><br /><label for="emailAddress">email@example.com</label>
              </div>
              <div class="basis-[48%]">
                <input
                  class="border border-gray-400 rounded-md w-full"
                  type="text"
                  name="Phonenum"
                  id="Phonenum"
                />
                <br /><label for="Phonenum">Phone Number</label>
              </div>
            </div>
          </div>
          <div>
            <div class="flex flex-wrap gap-3 my-3 justify-between">
              <div class="w-full">
                <label for="position">Position Applied</label>
                <select
                  name="position"
                  id="position"
                  class="w-full border border-gray-400 p-2 rounded-md"
                >
                  <option value="none">Select</option>

                  <option value="REMOTE-CUSTOMER-SERVICE">
                    REMOTE CUSTOMER SERVICE
                  </option>
                  <option value="REPRESENTATIVE">REPRESENTATIVE</option>
                  <option value="PAYMENT-PROCESSING-SPECIALIST">
                    PAYMENT PROCESSING SPECIALIST
                  </option>
                  <option value="REMOTE-DATA-ENTRY-OPERATOR">
                    REMOTE DATA ENTRY OPERATOR
                  </option>
                </select>
              </div>
              <div class="basis-[100%]">
                <label for="avstartdt">Available Start Date</label>
                <input
                  type="date"
                  name="avstartdt"
                  class="w-full border border-gray-400 p-2 rounded-md"
                />
              </div>
            </div>
          </div>

          <!-- Add other fields here -->
          <button
            class="w-full h-[40px] bg-[#18bd5b] text-white"
            type="button"
            onclick="nextStep(2)"
          >
            Next
          </button>
        </fieldset>

        <fieldset style="display: none">
          <legend class="text-center">WORK EXPERIENCE</legend>
          <!-- Add your input fields for other information here -->
          <!-- For example: -->

          <div class="my-3 flex flex-col gap-5">
            <div>
              <input
                type="text"
                name="cmpname"
                id="cmpname"
                class="border border-gray-400 rounded-md w-full"
              />
              <br />
              <label for="cmpname">Company Name and Location</label>
            </div>
            <div>
              <input
                type="text"
                name="position"
                id="position"
                class="border border-gray-400 rounded-md w-full"
              />
              <br />
              <label for="position">Position</label>
            </div>
            <div>
              <input
                type="text"
                name="website"
                id="website"
                class="border border-gray-400 rounded-md w-full"
              />
              <br />
              <label for="website">LinkedIn Profile Link</label>
            </div>
            <div>
              <input
                type="text"
                name="citiznship"
                id="citiznship"
                class="border border-gray-400 rounded-md w-full"
              />
              <br />
              <label for="citiznship">Citizenship</label>
            </div>
            <div>
              <input
                type="text"
                name="majsklls"
                id="majsklls"
                class="border border-gray-400 rounded-md w-full"
              />
              <br />
              <label for="majsklls">Major Skills</label>
            </div>
            <div>
              <input
                type="text"
                name="hourswkly"
                id="hourswkly"
                class="border border-gray-400 rounded-md w-full"
              />
              <br />
              <label for="hourswkly">How many hours can you work weekly?</label>
            </div>
            <div>
              <input
                type="text"
                name="wrknights"
                id="wrknights"
                class="border border-gray-400 rounded-md w-full"
              />
              <br />
              <label for="wrknights">Can you work Nights</label>
            </div>
            <div>
              <input
                type="text"
                name="empdisired"
                id="empdisired"
                class="border border-gray-400 rounded-md w-full"
              />
              <br />
              <label for="empdisired">Employment Type Desired</label>
            </div>
            <div>
              <input
                type="text"
                name="adskills"
                id="adskills"
                class="border border-gray-400 rounded-md w-full"
              />
              <br />
              <label for="adskills"
                >What skills or additional training do you have that related to
                the job you are applying for?</label
              >
            </div>
            <div>
              <input
                type="text"
                name="machnerelated"
                id="machnerelated"
                class="border border-gray-400 rounded-md w-full"
              />
              <br />
              <label for="machnerelated"
                >What machine or equipment can you operate that is related to
                the job for which you are applying for?</label
              >
            </div>
            <div>
              <input
                type="text"
                name="lawconv"
                id="lawconv"
                class="border border-gray-400 rounded-md w-full"
              />
              <br />
              <label for="lawconv"
                >Have you been convicted of any law violation? If yes, give
                details. (A conviction will not necessarily disqualify an
                applicant for employment.)</label
              >
            </div>
          </div>

          <!-- Add other fields here -->
          <div class="flex gap-2">
            <button
              class="w-1/2 h-[40px] bg-[#f17778] text-white"
              type="button"
              onclick="nextStep(1)"
            >
              Previous</button
            ><button
              type="submit"
              class="w-1/2 h-[40px] bg-[#18bd5b] text-white"
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </section>
  </body>
</html>
