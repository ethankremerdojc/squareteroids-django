class Timer {
    constructor() {
        this.hr = 0;
        this.min = 0;
        this.sec = 0;
        this.stoptime = true;
        this.object = document.getElementById("stopwatch")
    }

    start() {
        if (this.stoptime == true) {
            this.stoptime = false;
            this.timerCycle()
        }
    }

    stop() {
        if (this.stoptime == false) {
            this.stoptime = true;
        }
    }

    reset() {
        this.object.innerHTML = "00:00:00";
    }

    timerCycle () {
        if (this.stoptime == false) {
            this.sec = parseInt(this.sec);
            this.min = parseInt(this.min);
            this.hr = parseInt(this.hr);
        
            this.sec = this.sec + 1;
        
            if (this.sec == 60) {
                this.min = this.min + 1;
                this.sec = 0;
            }
            if (this.min == 60) {
                this.hr = this.hr + 1;
                this.min = 0;
                this.sec = 0;
            }
        
            if (this.sec < 10 || this.sec == 0) {
                this.sec = '0' + this.sec;
            }
            if (this.min < 10 || this.min == 0) {
                this.min = '0' + this.min;
            }
            if (this.hr < 10 || this.hr == 0) {
                this.hr = '0' + this.hr;
            }
        
            this.object.innerHTML = this.hr + ':' + this.min + ':' + this.sec;
            setTimeout(() => {this.timerCycle()}, 1000);
        }
      }

}

export {Timer};