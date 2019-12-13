import { OnInit, Directive, TemplateRef, ViewContainerRef, Input } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Directive({
  selector: '[hasRole]'
})
export class RoleDirective {

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private authService: AuthService) { }

  @Input() set hasRole(role: string) {
    const hasRole = this.authService.hasRole(role);
    if (hasRole) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
