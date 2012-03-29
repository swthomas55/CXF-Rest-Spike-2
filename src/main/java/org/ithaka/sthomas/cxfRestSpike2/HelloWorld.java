package org.ithaka.sthomas.cxfRestSpike2;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.ithaka.sthomas.cxfRestSpike2.rest.Link;
import org.ithaka.sthomas.cxfRestSpike2.rest.Resource;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

@Service("helloWorld")
@Path("/hello")
public class HelloWorld {

	int beanCounter = 1;

    @GET
    @Path("/echo/{input}")
    @Produces("text/plain")
    public String ping(@PathParam("input") String input) {
        return input;
    }

    @POST
    @Produces("application/json")
    @Consumes("application/json")
    @Path("/jsonBean")
    public Response modifyJson(JsonBean input) {
	input.setVal2(input.getVal1());
	Resource<JsonBean> entity = new Resource<JsonBean>(input);
	Link link = new Link();
	link.setRel("!! Value 1 copied to Value 2 !!");
	entity.addLink(link);
	Link link2 = new Link();
	link2.setHref("/rest/hello/jsonBean");
	link2.setMethod(HttpMethod.POST);
	link2.setRel("copy");
	entity.addLink(link2);
	return Response.ok().entity(entity).build();
    }

    @GET
    @Produces({"application/json", "text/xml", "application/xml"})
    @Consumes("application/json")
    @Path("/jsonBean")
    public Response getJson() {
    	JsonBean input = new JsonBean();
    	input.setVal1("value " + beanCounter++);
    	input.setVal2("value " + beanCounter++);
    	return Response.ok().entity(input).build();
    }

    @GET
    @Produces({"application/json"})
    @Consumes("application/json")
    @Path("/bean")
    public Response getResource() {
    	JsonBean input = new JsonBean();
    	input.setVal1("value " + beanCounter++);
    	input.setVal2("value " + beanCounter++);
    	Resource<JsonBean> entity = new Resource<JsonBean>(input);
    	Link link = new Link();
    	link.setHref("/rest/hello/echo/You clicked the echo link!");
    	link.setMethod(HttpMethod.GET);
    	link.setRel("echo");
    	entity.addLink(link);
    	Link link2 = new Link();
    	link2.setHref("/rest/hello/jsonBean");
    	link2.setMethod(HttpMethod.POST);
    	link2.setRel("copy");
    	entity.addLink(link2);
    	return Response.ok().entity(entity).build();
    }

}

