import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getLoggedInStaffInfo() {
    return this.http.get(environment.backendPath + '/blood-admin/logged-in');
  }

  updateStaffInfo(staffId: any, staffInfo: any) {
    console.log(staffInfo);
    return this.http.put(
      environment.backendPath + '/blood-admin/updateBloodAdmin/' + staffId,
      staffInfo
    );
  }

  updateStaffCenterInfo(centerId: any, centerInfo: any) {
    console.log(centerInfo);
    return this.http.put(
      environment.backendPath + '/blood-center/' + centerId,
      centerInfo
    );
  }
}
